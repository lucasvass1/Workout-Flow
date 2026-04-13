import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout ({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-6">GymTracker</h1>
        < nav className="flex flex-col gap-3">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="hover:bg-gray-600 p-2 rounded">
            Alunos
          </a>
          <a href="#" className="hover:bg-gray-600 p-2 rounded">
            Treinos
          </a>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-gray-800 flex items-center px-6 border-b border-gray-700">
          <span>Bem vindo, Lucas!👋</span>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
