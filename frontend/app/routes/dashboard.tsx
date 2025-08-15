import type { Route } from "./+types/dashboard";
import { useAuth } from "../auth";
import { ProtectedRoute } from "../ProtectedRoute";

import Sidebar from "../components/sidebar/Sidebar";
import DashboardHome from "~/components/dashboard/DashboardHome";

export function meta({}: Route.MetaArgs) { return [{ title: "Dashboard" }]; }

export default function Dashboard() {
  // const { user, logout } = useAuth();
  
  return (
    // Remember to add the ProtectedRoute and Use the useAuth Hook
      <main className="grid gap-4 py-4 grid-cols-[240px_1fr] bg-background pr-4">
        <Sidebar />
        <DashboardHome />
      </main>
  );
}
