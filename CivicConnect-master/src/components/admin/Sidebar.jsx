import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-xl">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        CivicConnect
      </div>

      <nav className="mt-6 flex flex-col gap-2">

        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/complaints"
          className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800"
        >
          <ClipboardList size={20} />
          Complaints
        </NavLink>

        <NavLink
          to="/admin/users"
          className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800"
        >
          <Users size={20} />
          Users
        </NavLink>

      </nav>

      <button
        className="absolute bottom-8 left-6 flex items-center gap-3 text-red-400"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
}