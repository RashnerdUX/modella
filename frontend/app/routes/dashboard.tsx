import type { Route } from "./+types/dashboard";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) { return [{ title: "Dashboard" }]; }

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me/", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        window.location.href = "/login";
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-2">Welcome {user?.username}</p>
      <form method="post" action="/api/auth/logout/" onSubmit={async e=>{
        e.preventDefault();
        await fetch('/api/auth/logout/', {method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}});
        window.location.href = '/login';
      }}>
        <button className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1 text-sm" type="submit">Logout</button>
      </form>
    </div>
  );
}
