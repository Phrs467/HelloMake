import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default async function AdminDashboard() {
  let totalProdutos = 0;
  let valorEstoque = 0;

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products`, { cache: "no-store" });
    if (res.ok) {
      const produtos = await res.json();
      totalProdutos = produtos.length;
      valorEstoque = produtos.reduce((acc: number, p: any) => acc + (Number(p.preco) * Number(p.estoque)), 0);
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#D81B60]">Bem-vinda, Admin!</h1>
        <p className="text-hotPink/80 mt-2">Visão geral da sua loja Hello Make e Acessórios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-200">
          <h3 className="text-hotPink font-bold text-sm mb-1 uppercase tracking-wider">Produtos no Catálogo</h3>
          <p className="text-4xl font-black text-[#D81B60]">{totalProdutos}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-200">
          <h3 className="text-hotPink font-bold text-sm mb-1 uppercase tracking-wider">Valor do Estoque Atual</h3>
          <p className="text-3xl font-black text-[#25D366]">R$ {valorEstoque.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg shadow-pink-100/50 border border-pink-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-[#D81B60]">Gestão de Catálogo</h2>
          <p className="text-hotPink/80 mt-1">Cadastre novas maquiagens ou edite o estoque atual.</p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button className="bg-[#D81B60] hover:bg-hotPink text-white h-12 px-6 rounded-xl shadow-[0_8px_20px_rgb(233,30,99,0.3)]">
            <PackagePlus className="w-5 h-5 mr-2" />
            Cadastrar Produto
          </Button>
        </Link>
      </div>
    </div>
  );
}
