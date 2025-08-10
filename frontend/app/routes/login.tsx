import type { Route } from "./+types/login";
import { FormEvent, useState } from "react";

export function meta({}: Route.MetaArgs) { return [{ title: "Login" }]; }

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Login failed");
      const me = await fetch("/api/auth/me/", { credentials: "include" });
      if (me.ok) window.location.href = "/dashboard"; else throw new Error("Unable to fetch user");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Sign In</button>
      </form>
    </div>
  );
}
