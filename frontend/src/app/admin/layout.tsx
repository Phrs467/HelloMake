"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Package, LayoutDashboard, Settings, LogOut, ShoppingCart, Bookmark } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Timeout de 5 minutos
  useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const resetTimer = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          document.cookie = "admin_token=; path=/; max-age=0;";
          window.location.href = "/login/admin";
        }, 5 * 60 * 1000); // 5 minutos
      };

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("click", resetTimer);
      window.addEventListener("scroll", resetTimer);

      resetTimer();

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
        window.removeEventListener("click", resetTimer);
        window.removeEventListener("scroll", resetTimer);
      };
    }, []);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0;";
    window.location.href = "/login/admin";
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex font-inter text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-pink-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="h-20 flex items-center px-6 border-b border-pink-100">
          <Link href="/admin" className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="Hello Admin" 
              className="h-10 w-auto object-contain drop-shadow-sm mix-blend-multiply"
            />
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
            { href: '/admin/produtos', label: 'Catálogo', icon: Package, exact: false },
            { href: '/admin/categorias', label: 'Categorias', icon: Bookmark, exact: false }
          ].map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#D81B60] text-white font-bold shadow-md' : 'text-gray-600 font-medium hover:bg-pink-200 hover:text-hotPink'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-pink-100 flex flex-col gap-2">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-hotPink hover:bg-pink-100 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Sair e Deslogar
          </button>
          <div className="text-[10px] text-gray-400 text-center font-mono select-none border-t border-pink-50 pt-2">
            Versão: 1.2.0 (Múltiplas Imagens)
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-[#FFF0F5] min-h-screen">
        {children}
      </main>

    </div>
  );
}
