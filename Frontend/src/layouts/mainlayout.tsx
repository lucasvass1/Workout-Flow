import {  type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard , Users , Dumbbell } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout ({ children }: MainLayoutProps) {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Alunos", path: "/students", icon: Users },
    { name: "Treinos", path: "/workouts", icon: Dumbbell },
  ];
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">GymTracker</h1>
        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-900 flex items-center px-6 border-b border-gray-700">
          <span>Bem vindo, Lucas!👋</span>
        </header>
        <main className="flex-1 p-6 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}