import type { Route } from "./+types/wardrobe";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) { return [{ title: "Wardrobe" }]; }

interface WardrobeItem { id:number; name:string; category:string; color:string; }

export default function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async () => {
      const me = await fetch('/api/auth/me/', {credentials:'include'});
      if (!me.ok) { window.location.href='/login'; return; }
      const res = await fetch('/api/wardrobe/', {credentials:'include'});
      if (res.ok) {
        const data = await res.json();
        setItems(data.results || data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Wardrobe</h1>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id} className="border rounded px-3 py-2 flex justify-between">
            <span>{i.name}</span>
            <span className="text-xs text-gray-500">{i.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
