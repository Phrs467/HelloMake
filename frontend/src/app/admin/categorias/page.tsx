"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bookmark, Search, Edit, Trash2, Plus } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function ListaCategorias() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchCategories() {
    setLoading(true);
    try {
      const query = search ? `?query=${search}` : '';
      const res = await fetch(`${API_BASE_URL}/api/v1/categories${query}`);
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [search]);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        alert("Erro ao excluir. Pode haver produtos vinculados a esta categoria.");
      }
    } catch (error) {
      alert("Erro de conexão ao excluir.");
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-pink-100 text-hotPink rounded-full flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-outfit font-black tracking-tight text-gray-900">Categorias</h1>
          </div>
          <p className="text-gray-500 text-lg ml-14">Gerencie as categorias de produtos da loja.</p>
        </div>

        <Link href="/admin/categorias/novo">
          <Button className="bg-[#2D2D2D] hover:bg-hotPink text-white h-12 px-6 rounded-2xl shadow-[0_8px_20px_rgb(233,30,99,0.2)] transition-all hover:-translate-y-1">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Nova
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome da categoria..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all"
          />
        </div>
      </div>

      {/* Tabela de Categorias */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Nome da Categoria</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Slug</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Descrição</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-400">Carregando...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-400">Nenhuma categoria encontrada.</td></tr>
            ) : (
              categories.map(categoria => (
                <tr key={categoria.id} className="border-b border-gray-100 hover:bg-pink-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-800">{categoria.nome}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-sm hidden md:table-cell">
                    {categoria.slug}
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm hidden md:table-cell">
                    {categoria.descricao || <span className="italic opacity-50">Sem descrição</span>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/categorias/${categoria.id}/editar`}>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(categoria.id)} className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
