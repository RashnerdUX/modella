import type { Route } from "./+types/register";
import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../auth";

export function meta({}: Route.MetaArgs) { return [{ title: "Register" }]; }

export default function Register() {
  const { register: registerUser, loading, user } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: string) { setForm({ ...form, [k]: v }); }

  if (!loading && user) {
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = await registerUser(form);
    if (!ok) setError("Registration failed");
    else window.location.href = '/dashboard';
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
