import type { Route } from "./+types/dashboard";
import { useAuth } from "../auth";
import { ProtectedRoute } from "../ProtectedRoute";

export function meta({}: Route.MetaArgs) { return [{ title: "Dashboard" }]; }

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p className="mb-2">Welcome {user?.username}</p>
        <button className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-1 text-sm" onClick={async ()=>{await logout(); window.location.href='/login';}}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
