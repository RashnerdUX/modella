import type { Route } from "./+types/register";
import { FormEvent, useState } from "react";

export function meta({}: Route.MetaArgs) { return [{ title: "Register" }]; }

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: string) { setForm({ ...form, [k]: v }); }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Registration failed");
      const me = await fetch("/api/auth/me/", { credentials: "include" });
      if (me.ok) window.location.href = "/dashboard"; else throw new Error("Unable to fetch user");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Username" value={form.username} onChange={e=>update('username', e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>update('email', e.target.value)} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={e=>update('password', e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Sign Up</button>
      </form>
    </div>
  );
}
