"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Search, Edit, Trash2, Plus } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function ListaProdutos() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchProducts() {
    setLoading(true);
    try {
      const query = search ? `?search=${search}` : '';
      const res = await fetch(`${API_BASE_URL}/api/v1/products${query}`);
      if (res.ok) {
        setProducts(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Erro ao excluir.");
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
                <Package className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-outfit font-black tracking-tight text-gray-900">Estoque</h1>
          </div>
          <p className="text-gray-500 text-lg ml-14">Gerencie os produtos ativos na sua loja.</p>
        </div>

        <Link href="/admin/produtos/novo">
          <Button className="bg-[#2D2D2D] hover:bg-hotPink text-white h-12 px-6 rounded-2xl shadow-[0_8px_20px_rgb(233,30,99,0.2)] transition-all hover:-translate-y-1">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Novo
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome do produto..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all"
          />
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Produto</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Categoria</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Preço</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="py-8 text-center text-gray-400">Carregando...</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-pink-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                        {product.imagens && product.imagens.length > 0 && (
                          <img src={product.imagens[0].url} alt="Produto" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-bold text-gray-800">{product.nome}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-medium">
                    {product.categoria?.nome || 'Sem Categoria'}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      R$ {Number(product.preco).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/produtos/${product.id}/editar`}>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-red-600 hover:bg-red-50">
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
