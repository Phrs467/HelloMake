"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Package, DollarSign, Tag, Bookmark, FileText, CheckCircle2 } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function NovoProduto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/categories`);
        if (res.ok) {
          setCategories(await res.json());
        }
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    }
    loadCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            setImageBase64(compressedBase64);
          } else {
            setImageBase64(reader.result as string);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    if (!imageBase64) {
      alert("Por favor, selecione uma imagem para o produto.");
      setLoading(false);
      return;
    }
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string, 10),
      categoryName: formData.get("categoryName"),
      categorySlug: (formData.get("categoryName") as string).toLowerCase().replace(/ /g, '-'),
      brandName: formData.get("brandName"),
      brandSlug: (formData.get("brandName") as string).toLowerCase().replace(/ /g, '-'),
      images: [imageBase64],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
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
              <Package className="w-5 h-5" />
           </div>
           <h1 className="text-4xl font-outfit font-black tracking-tight text-[#D81B60]">Novo Produto</h1>
        </div>
        <p className="text-hotPink/80 text-lg ml-14">Crie e adicione um novo item de beleza ao seu catálogo oficial.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative">
        
        {success && (
          <div className="absolute -top-4 right-0 bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-200 shadow-lg shadow-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-bold">Sucesso Absoluto!</p>
              <p className="text-sm opacity-90">O produto já está disponível no catálogo.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/60 border border-pink-200">
          
          <h3 className="font-outfit font-black text-xl text-[#D81B60] mb-6 flex items-center gap-2 border-b border-pink-100 pb-4">
            Informações Principais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Nome */}
            {/* Generic Field Replacement Rule applied to all inputs */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Nome do Produto</label>
              <div className="relative">
                <input required name="name" type="text" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold shadow-sm shadow-pink-100/50" placeholder="Ex: Máscara de Cílios Volume Extremo" />
                <Package className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Preço e Estoque */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Preço de Venda</label>
              <div className="relative">
                <input required name="price" type="number" step="0.01" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-[#D81B60] font-black font-mono shadow-sm shadow-pink-100/50" placeholder="89.90" />
                <DollarSign className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Quantidade em Estoque</label>
              <div className="relative">
                <input required name="stock" type="number" min="0" step="1" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-[#D81B60] font-black font-mono shadow-sm shadow-pink-100/50" placeholder="Ex: 50" />
                <Package className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Categoria Principal</label>
              <div className="relative">
                <select required name="categoryName" defaultValue="" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold appearance-none cursor-pointer shadow-sm shadow-pink-100/50">
                  <option value="" disabled>Selecione uma categoria...</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                  ))}
                </select>
                <Bookmark className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Marca */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Fabricante / Marca</label>
              <div className="relative">
                <input required name="brandName" type="text" className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold shadow-sm shadow-pink-100/50" placeholder="Ex: Niina Secrets" />
                <Tag className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2 col-span-1 md:col-span-2 mt-4">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Descrição Comercial</label>
              <div className="relative">
                <textarea required name="description" rows={5} className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold resize-none shadow-sm shadow-pink-100/50" placeholder="Descreva os benefícios, ativos e como este produto transforma a rotina de beleza..."></textarea>
                <FileText className="w-5 h-5 text-pink-400 absolute left-4 top-5" />
              </div>
            </div>

            {/* Imagem do Produto */}
            <div className="space-y-2 col-span-1 md:col-span-2 mt-4">
              <label className="text-[13px] font-bold text-hotPink uppercase tracking-wider ml-1">Imagem do Produto (Upload)</label>
              <div className="relative">
                <input required type="file" accept="image/*" onChange={handleImageChange} className="w-full h-14 pl-4 pr-4 bg-white rounded-2xl border-2 border-pink-100 focus:bg-pink-50/30 focus:border-vibrantPink focus:ring-4 focus:ring-pink-100/50 outline-none transition-all text-gray-800 font-bold shadow-sm shadow-pink-100/50 flex items-center pt-3" />
              </div>
              <p className="text-xs text-hotPink/60 ml-2 mt-1 font-bold">Selecione uma imagem real do seu computador (PNG, JPG, JPEG).</p>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin')} className="text-gray-500 hover:text-gray-900 font-bold px-6">
            Cancelar
          </Button>
          <Button disabled={loading} type="submit" className="bg-[#2D2D2D] hover:bg-hotPink text-white h-14 px-10 rounded-2xl text-lg font-bold shadow-[0_8px_20px_rgb(233,30,99,0.2)] transition-all hover:-translate-y-1">
            {loading ? "Processando..." : "Publicar Produto Oficial"}
          </Button>
        </div>
      </form>
    </div>
  );
}
