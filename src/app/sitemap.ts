import type { MetadataRoute } from "next";

const baseUrl = "https://stichtingbulldogsteunfondsnederland.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/over-ons",
    "/aanvragen",
    "/doneren",
    "/donateurs",
    "/verhalen",
    "/blog",
    "/updates",
    "/anbi",
    "/acties",
    "/beleidsplan",
    "/beleidsplan-2025-2028",
    "/privacyverklaring",
    "/contact",
    "/shop",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/aanvragen" || route === "/doneren" ? 0.9 : 0.7,
  }));
}
