"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Bookmark, FileText, CheckCircle2, Type } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function NovaCategoria() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get("name"),
      description: formData.get("description") || undefined,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const err = await response.json();
        alert("Erro da API: " + JSON.stringify(err));
      }
    } catch (error: any) {
      console.error(error);
      alert("Erro de Conexão: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header do Formulário */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
           <div className="w-10 h-10 bg-pink-100 text-[#D81B60] rounded-full flex items-center justify-center shadow-md shadow-pink-100">
              <Bookmark className="w-5 h-5" />
           </div>
           <h1 className="text-4xl font-outfit font-black tracking-tight text-[#D81B60]">Nova Categoria</h1>
        </div>
        <p className="text-hotPink/80 text-lg ml-14">Crie uma nova categoria para organizar seus produtos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative">
        
        {success && (
          <div className="absolute -top-4 right-0 bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-200 shadow-lg shadow-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-bold">Sucesso Absoluto!</p>
              <p className="text-sm opacity-90">A categoria foi criada e já está disponível.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/60 border border-pink-200">
          
          <h3 className="font-outfit font-black text-xl text-[#D81B60] mb-6 flex items-center gap-2 border-b border-pink-100 pb-4">
            Informações da Categoria
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Nome */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Nome da Categoria</label>
              <div className="relative">
                <input required name="name" type="text" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold shadow-sm shadow-pink-100/50" placeholder="Ex: Maquiagem" />
                <Type className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2 col-span-1 md:col-span-2 mt-4">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Descrição (Opcional)</label>
              <div className="relative">
                <textarea name="description" rows={5} className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold resize-none shadow-sm shadow-pink-100/50" placeholder="Descreva os tipos de produtos que farão parte desta categoria..."></textarea>
                <FileText className="w-5 h-5 text-pink-400 absolute left-4 top-5" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/categorias')} className="text-gray-500 hover:text-gray-900 font-bold px-6">
            Cancelar
          </Button>
          <Button disabled={loading} type="submit" className="bg-[#2D2D2D] hover:bg-hotPink text-white h-14 px-10 rounded-2xl text-lg font-bold shadow-[0_8px_20px_rgb(233,30,99,0.2)] transition-all hover:-translate-y-1">
            {loading ? "Processando..." : "Criar Categoria"}
          </Button>
        </div>
      </form>
    </div>
  );
}
