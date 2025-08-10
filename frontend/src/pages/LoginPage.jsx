import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post('/api/auth/login/', { username, password });
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full" type="submit">Login</button>
      </form>
    </div>
  );
}
