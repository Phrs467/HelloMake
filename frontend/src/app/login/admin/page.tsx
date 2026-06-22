"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se já está logado
  useEffect(() => {
    if (document.cookie.includes("admin_token=")) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0;";
    setIsLoggedIn(false);
    router.refresh();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Salva o token falso nos cookies para o Middleware do Next.js ler
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400;`;
        router.push("/admin");
      } else {
        setError("E-mail ou senha incorretos.");
      }
    } catch (err) {
      setError("Falha ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#2D2D2D] flex items-center justify-center p-4 font-inter relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-hotPink rounded-full blur-[150px] opacity-20"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-rosePrimary rounded-full blur-[150px] opacity-20"></div>

      <div className="w-full max-w-md z-10">
        
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-pink-100 mx-auto p-2">
             <img 
               src="/logo.jpg" 
               alt="Hello Admin" 
               className="w-full h-full object-contain mix-blend-multiply"
             />
          </div>
          <h1 className="font-outfit text-2xl font-black tracking-tighter text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-500 font-medium">Controle total da Hello Make e Acessórios</p>
        </div>

        {isLoggedIn ? (
          <div className="bg-[#3A3A3A] p-8 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-md text-center">
            <h2 className="text-white font-bold text-xl mb-4">Você já está logado</h2>
            <div className="space-y-3">
              <Button 
                onClick={() => router.push("/admin")}
                className="w-full h-12 bg-hotPink hover:bg-rosePrimary text-white font-bold rounded-xl shadow-[0_0_20px_rgb(233,30,99,0.3)] transition-all"
              >
                Acessar Painel
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="w-full h-12 border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all"
              >
                Deslogar da Conta
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="bg-[#3A3A3A] p-8 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-md">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-bold mb-6 text-center">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">E-mail</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-12 px-4 bg-[#2D2D2D] text-white rounded-xl border border-transparent focus:border-hotPink outline-none transition-colors"
                  placeholder="seu e-mail"
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Senha</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 px-4 bg-[#2D2D2D] text-white rounded-xl border border-transparent focus:border-hotPink outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                disabled={loading}
                className="w-full h-12 bg-hotPink hover:bg-rosePrimary text-white font-bold rounded-xl shadow-[0_0_20px_rgb(233,30,99,0.3)] mt-4 transition-all"
              >
                {loading ? "Verificando..." : "Entrar no Painel"} <Lock className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
