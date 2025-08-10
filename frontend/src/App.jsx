import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import WardrobePage from './pages/WardrobePage.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow px-4 py-3 flex justify-between">
        <Link to="/" className="font-semibold text-indigo-600">Modella</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-sm text-gray-700 hover:text-indigo-600">Dashboard</Link>
          <Link to="/wardrobe" className="text-sm text-gray-700 hover:text-indigo-600">Wardrobe</Link>
          <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
        </div>
      </nav>
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<div className="py-10 text-center"><h1 className="text-3xl font-bold">Welcome to Modella</h1></div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
        </Routes>
      </main>
    </div>
  );
}
