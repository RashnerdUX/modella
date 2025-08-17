import type { Route } from "./+types/dashboard";
import { Outlet } from "react-router";
import { useAuth } from "../auth";
import { ProtectedRoute } from "../ProtectedRoute";
import Sidebar from "../components/sidebar/Sidebar";

export function meta({}: Route.MetaArgs) { return [{ title: "Dashboard" }]; }

export default function Dashboard() {
  
  return (
    <ProtectedRoute>
      <main className="grid gap-4 py-4 grid-cols-[240px_1fr] bg-background pr-4">
        <Sidebar />
        <div className="bg-white rounded-2xl min-h-screen">
          <Outlet />
        </div>
      </main>
    </ProtectedRoute>
  );
}
