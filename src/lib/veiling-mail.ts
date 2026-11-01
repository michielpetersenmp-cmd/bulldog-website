import tls from "node:tls";

const DEFAULT_ADDRESS = "info@stichtingbulldogsteunfondsnederland.nl";

type SmtpSettings = {
  host: string;
  port: number;
  user: string;
  password: string;
  fromName: string;
  testRecipient: string;
  liveDeliveryEnabled: boolean;
};

type MailMessage = { subject: string; html: string };

function settings(): SmtpSettings {
  return {
    host: (process.env.VEILING_SMTP_HOST || "mail.mijndomein.nl").trim(),
    port: Number(process.env.VEILING_SMTP_PORT || 465),
    user: (process.env.VEILING_SMTP_USER || DEFAULT_ADDRESS).trim().toLowerCase(),
    password: process.env.VEILING_SMTP_PASSWORD || "",
    fromName: (process.env.VEILING_SMTP_FROM_NAME || "Stichting Bulldog Steunfonds Nederland").trim(),
    testRecipient: (process.env.VEILING_TEST_EMAIL || DEFAULT_ADDRESS).trim().toLowerCase(),
    liveDeliveryEnabled: process.env.VERCEL_ENV === "production" && process.env.VEILING_MAIL_ENABLED === "true",
  };
}

export function getVeilingMailStatus() {
  const value = settings();
  return {
    configured: Boolean(value.password),
    sender: value.user,
    testRecipient: value.testRecipient,
    liveDeliveryEnabled: value.liveDeliveryEnabled,
  };
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function base64Lines(value: string) {
  return Buffer.from(value, "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";
}

async function sendSmtpMail(recipient: string, message: MailMessage) {
  const value = settings();
  if (!value.password) throw new Error("SMTP_NOT_CONFIGURED");
  if (!Number.isInteger(value.port) || value.port < 1 || value.port > 65535) throw new Error("SMTP_INVALID_PORT");

  const socket = tls.connect({
    host: value.host,
    port: value.port,
    servername: value.host,
    rejectUnauthorized: true,
  });
  socket.setTimeout(15000);

  let buffer = "";
  const waiting: Array<{ resolve: (line: string) => void; reject: (error: Error) => void }> = [];

  socket.on("data", chunk => {
    buffer += chunk.toString("utf8");
    while (waiting.length) {
      const lines = buffer.split("\r\n");
      let end = -1;
      for (let index = 0; index < lines.length - 1; index += 1) {
        if (/^\d{3} /.test(lines[index])) end = index;
      }
      if (end < 0) break;
      const response = lines.slice(0, end + 1).join("\r\n");
      buffer = lines.slice(end + 1).join("\r\n");
      waiting.shift()?.resolve(response);
    }
  });

  function response() {
    return new Promise<string>((resolve, reject) => waiting.push({ resolve, reject }));
  }

  function command(line: string) {
    socket.write(line + "\r\n");
    return response();
  }

  function expect(reply: string, codes: number[]) {
    const code = Number(reply.slice(0, 3));
    if (!codes.includes(code)) throw new Error(`SMTP_${code || "UNKNOWN"}`);
  }

  const connectionError = new Promise<never>((_, reject) => {
    socket.once("error", error => reject(error));
    socket.once("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP_TIMEOUT"));
    });
  });

  const conversation = (async () => {
    expect(await response(), [220]);
    expect(await command("EHLO stichtingbulldogsteunfondsnederland.nl"), [250]);
    expect(await command("AUTH LOGIN"), [334]);
    expect(await command(Buffer.from(value.user).toString("base64")), [334]);
    expect(await command(Buffer.from(value.password).toString("base64")), [235]);
    expect(await command(`MAIL FROM:<${value.user}>`), [250]);
    expect(await command(`RCPT TO:<${recipient}>`), [250, 251]);
    expect(await command("DATA"), [354]);

    const email = [
      `From: ${encodeHeader(value.fromName)} <${value.user}>`,
      `Reply-To: <${value.user}>`,
      `To: <${recipient}>`,
      `Subject: ${encodeHeader(message.subject)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      base64Lines(message.html),
    ].join("\r\n");

    socket.write(email + "\r\n.\r\n");
    expect(await response(), [250]);
    expect(await command("QUIT"), [221]);
    socket.end();
  })();

  await Promise.race([conversation, connectionError]);
  return { recipient };
}

export async function sendVeilingTestMail(message?: MailMessage) {
  const value = settings();
  return sendSmtpMail(value.testRecipient, message || {
    subject: "Testmail veilingsysteem",
    html: "<p>De beveiligde e-mailverbinding tussen het veilingbeheer en MijnDomein werkt.</p>",
  });
}

export async function sendVeilingRegistrationMail(recipient: string, message: MailMessage) {
  const value = settings();
  const actualRecipient = value.liveDeliveryEnabled ? recipient : value.testRecipient;
  const result = await sendSmtpMail(actualRecipient, message);
  return { ...result, testMode: !value.liveDeliveryEnabled };
}


export async function sendVeilingParticipantMail(recipient: string, message: MailMessage) {
  return sendVeilingRegistrationMail(recipient, message);
}
