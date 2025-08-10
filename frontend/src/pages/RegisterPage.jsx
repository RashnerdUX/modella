import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post('/api/auth/register/', form);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="w-full border p-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full" type="submit">Create account</button>
      </form>
    </div>
  );
}
