"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Lot = {id:number;lot_number:number;title:string;sponsor:string|null;description:string|null;start_bid:number;bid_count:number;active:boolean;image_url:string|null;sponsor_website:string|null;sponsor_facebook:string|null};
const blank = { id: 0, lot_number: 1, title: "", sponsor: "", description: "", start_bid: 1, bid_count: 0, active: false, image_url: null, sponsor_website: "", sponsor_facebook: "" };
export default function VeilingKavelsBewerken({lots}:{lots:Lot[]}) {
 const router = useRouter();
 const [item,setItem] = useState<Lot|null>(null);
 const [busy,setBusy] = useState(false);
 const [uploading,setUploading] = useState(false);
 const [message,setMessage] = useState("");
 async function uploadPhoto(file:File) {
  setUploading(true); setMessage("");
  try {
   const form=new FormData();form.append("foto",file);
   const resp=await fetch("/api/admin/veiling-foto",{method:"POST",body:form});
   const data=await resp.json();if(!resp.ok)throw new Error(data.error || "Foto uploaden mislukt.");
   setItem(previous=>previous?{...previous,image_url:data.image_url}:previous);
  }catch(error){setMessage(error instanceof Error?error.message:"Foto uploaden mislukt.");}
  finally{setUploading(false);}
 }
 function edit(lot:Lot) {setItem({...lot});setMessage("");}
 async function save(e:React.FormEvent) {
  e.preventDefault(); if(!item)return;
  setBusy(true);setMessage("");
  try {
   const response=await fetch("/api/admin/veiling-kavels",{method:item.id?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(item)});
   const result=await response.json();if(!response.ok)throw new Error(result.error||"Opslaan mislukt.");
   setItem(null);router.refresh();
  }catch(err){setMessage(err instanceof Error?err.message:"Opslaan mislukt.");}
  finally{setBusy(false);}
 }
 return <section className="mt-8">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <h2 className="text-2xl font-bold text-primary">Kavels beheren</h2>
   <button onClick={()=>edit({...blank,lot_number:Math.max(0,...lots.map(x=>x.lot_number))+1})} className="rounded-xl bg-primary px-5 py-3 font-bold text-white">+ Nieuw kavel</button>
  </div>
  <p className="mt-2 text-sm text-slate-600">Voeg kavels toe of bewerk titels, sponsoren, omschrijvingen en startbedragen. Alles blijft in testmodus.</p>
  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
   {lots.map(lot=><article key={lot.id} className="rounded-2xl bg-white p-5 shadow-sm">
    <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Kavel {String(lot.lot_number).padStart(3,"0")} · {lot.active?"Test actief":"Test verborgen"}</p>
    <h3 className="mt-2 text-lg font-bold text-primary">{lot.title}</h3>
    <p className="mt-1 text-sm text-slate-500">{lot.sponsor||"Geen sponsor opgegeven"}</p>
    <p className="mt-2 font-bold">Startbod € {lot.start_bid}</p>
    <button onClick={()=>edit(lot)} className="mt-3 rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary">Bewerken</button>
   </article>)}
  </div>
  {item&&<div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 py-6">
   <form onSubmit={save} className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
    <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-primary">{item.id?"Kavel aanpassen":"Nieuw testkavel"}</h3><button type="button" onClick={()=>setItem(null)} className="p-2 text-xl" aria-label="Sluiten">×</button></div>
    <label className="block text-sm font-semibold">Kavelnummer<input required type="number" min="1" max="99999" className="mt-1 w-full rounded-lg border p-3" value={item.lot_number} onChange={e=>setItem({...item,lot_number:Number(e.target.value)})}/></label>
    <label className="block text-sm font-semibold">Titel<input required maxLength={180} className="mt-1 w-full rounded-lg border p-3" value={item.title} onChange={e=>setItem({...item,title:e.target.value})}/></label>
    <label className="block text-sm font-semibold">Bedrijf / sponsor<input maxLength={180} className="mt-1 w-full rounded-lg border p-3" value={item.sponsor||""} onChange={e=>setItem({...item,sponsor:e.target.value})}/></label>
    <label className="block text-sm font-semibold">Website sponsor (optioneel)<input type="url" placeholder="https://www.voorbeeld.nl" className="mt-1 w-full rounded-lg border p-3" value={item.sponsor_website||""} onChange={e=>setItem({...item,sponsor_website:e.target.value})}/></label>
    <label className="block text-sm font-semibold">Facebook sponsor (optioneel)<input type="url" placeholder="https://www.facebook.com/..." className="mt-1 w-full rounded-lg border p-3" value={item.sponsor_facebook||""} onChange={e=>setItem({...item,sponsor_facebook:e.target.value})}/></label>
    <label className="block text-sm font-semibold">Foto kavel (maximaal 5 MB)
      <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-1 block w-full text-sm" onChange={e=>{const file=e.target.files?.[0];if(file)void uploadPhoto(file);}}/>
      <span className="mt-1 block text-xs font-normal text-slate-500">{uploading?"Foto wordt geüpload...":item.image_url?"Foto toegevoegd. Je kunt een andere foto kiezen.":"Kies een foto vanaf je telefoon."}</span>
    </label>
    <label className="block text-sm font-semibold">Omschrijving<textarea rows={5} maxLength={4000} className="mt-1 w-full rounded-lg border p-3" value={item.description||""} onChange={e=>setItem({...item,description:e.target.value})}/></label>
    <label className="block text-sm font-semibold">Startbod (hele euro's)<input required type="number" min="0" step="1" className="mt-1 w-full rounded-lg border p-3" value={item.start_bid} disabled={item.bid_count>0} onChange={e=>setItem({...item,start_bid:Number(e.target.value)})}/></label>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={item.active} onChange={e=>setItem({...item,active:e.target.checked})}/> Tonen in de testveiling</label>
    {message&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{message}</p>}
    <div className="flex gap-3"><button type="submit" disabled={busy||uploading} className="rounded-xl bg-primary px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"Opslaan...":"Kavel opslaan"}</button><button type="button" onClick={()=>setItem(null)} className="rounded-xl border px-4 py-3">Annuleren</button></div>
   </form>
  </div>}
 </section>;
}
