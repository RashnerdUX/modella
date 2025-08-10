import type { Route } from "./+types/login";
import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../auth";

export function meta({}: Route.MetaArgs) { return [{ title: "Login" }]; }

export default function Login() {
  const { login, loading, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!loading && user) {
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = await login(username, password);
    if (!ok) setError("Login failed");
    else window.location.href = '/dashboard';
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
