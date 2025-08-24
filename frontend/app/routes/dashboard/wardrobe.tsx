import type { Route } from "./+types/wardrobe";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth";
import apiClient from "../../../utils/axios";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) { return [{ title: "Wardrobe" }]; }

interface WardrobeItem { id:number; name:string; category:string; color:string; }

export default function Wardrobe() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(()=>{
    (async () => {
      if (authLoading) return;
      if (!user) { navigate('/login'); return; }
      try {
        const res = await apiClient.get('/api/wardrobe/');
        setItems(res.data.results || res.data);
      } catch (error) {
        console.error('Failed to fetch wardrobe items:', error);
      }
      setLoading(false);
    })();
  }, [authLoading, user]);

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