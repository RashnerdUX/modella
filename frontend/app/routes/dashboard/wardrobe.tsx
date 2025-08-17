import type { Route } from "./+types/wardrobe";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth";
import { ProtectedRoute } from "../../ProtectedRoute";

export function meta({}: Route.MetaArgs) { return [{ title: "Wardrobe" }]; }

interface WardrobeItem { id:number; name:string; category:string; color:string; }

export default function Wardrobe() {
  const { user, loading: authLoading, authFetch } = useAuth();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async () => {
      if (authLoading) return;
      if (!user) { window.location.href='/login'; return; }
      const res = await authFetch('/api/wardrobe/');
      if (res.ok) {
        const data = await res.json();
        setItems(data.results || data);
      }
      setLoading(false);
    })();
  }, [authLoading, user, authFetch]);

  if (loading || authLoading) return <p className="p-4">Loading...</p>;
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