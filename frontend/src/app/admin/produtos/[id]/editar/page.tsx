"use client";

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Package, DollarSign, Tag, Bookmark, FileText, CheckCircle2 } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function EditarProduto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");
  const [secondaryImage, setSecondaryImage] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const processImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const MAX = 1200;
        if (width > height && width > MAX) { height *= MAX / width; width = MAX; }
        else if (height > MAX) { width *= MAX / height; height = MAX; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL("image/jpeg", 0.7));
        } else {
          callback(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [resProduct, resCategories] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/products/${productId}`),
          fetch(`${API_BASE_URL}/api/v1/categories`)
        ]);

        if (resProduct.ok) {
          const data = await resProduct.json();
          setProductData(data);
          if (data.imagens && data.imagens.length > 0) {
            setMainImage(data.imagens[0].url);
            if (data.imagens.length > 1) {
              setSecondaryImage(data.imagens[1].url);
            }
          }
        }
        if (resCategories.ok) setCategories(await resCategories.json());
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    loadData();
  }, [productId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const images = [];
    if (mainImage) images.push(mainImage);
    if (secondaryImage) images.push(secondaryImage);

    const rawPrice = (formData.get("price") as string || "").replace(",", ".");
    const price = parseFloat(rawPrice);
    const stock = parseInt(formData.get("stock") as string, 10);
    const name = (formData.get("name") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();
    const categoryName = (formData.get("categoryName") as string || "").trim();
    const brandName = (formData.get("brandName") as string || "").trim();

    const data = {
      name,
      description,
      price: isNaN(price) ? 0 : price,
      stock: isNaN(stock) ? 0 : stock,
      categoryName,
      categorySlug: categoryName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'),
      brandName,
      brandSlug: brandName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'),
      images: images,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const err = await response.json();
        alert("Erro da API: " + JSON.stringify(err));
      }
    } catch (error: any) {
      alert("Erro de Conexão: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!productData) {
    return <div className="p-8 text-gray-500">Carregando dados do produto...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header do Formulário */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <h1 className="text-4xl font-outfit font-black tracking-tight text-gray-900">Editar Produto</h1>
        </div>
        <p className="text-gray-500 text-lg ml-14">Modifique as informações e atualize o catálogo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative">

        {success && (
          <div className="absolute -top-4 right-0 bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-200 shadow-lg shadow-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-bold">Atualização Realizada!</p>
              <p className="text-sm opacity-90">As alterações já estão no ar.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

          <h3 className="font-outfit font-bold text-xl text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            Informações do Produto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Nome do Produto</label>
              <div className="relative">
                <input required name="name" defaultValue={productData.nome} type="text" className="w-full h-14 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium" />
                <Package className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Preço de Venda</label>
              <div className="relative">
                <input required name="price" defaultValue={productData.preco} type="number" step="0.01" className="w-full h-14 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium font-mono" />
                <DollarSign className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Quantidade em Estoque</label>
              <div className="relative">
                <input required name="stock" defaultValue={productData.estoque} type="number" min="0" step="1" className="w-full h-14 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium font-mono" />
                <Package className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Categoria Principal</label>
              <div className="relative">
                <select required name="categoryName" defaultValue={productData.categoria?.nome || ""} className="w-full h-14 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium appearance-none cursor-pointer">
                  <option value="" disabled>Selecione uma categoria...</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                  ))}
                </select>
                <Bookmark className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Fabricante / Marca</label>
              <div className="relative">
                <input required name="brandName" defaultValue={productData.marca?.nome} type="text" className="w-full h-14 pl-12 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium" />
                <Tag className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2 mt-4">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Descrição Comercial</label>
              <div className="relative">
                <textarea required name="description" defaultValue={productData.descricao} rows={5} className="w-full pl-12 pr-4 py-4 bg-gray-50/50 rounded-3xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium resize-none"></textarea>
                <FileText className="w-5 h-5 text-gray-400 absolute left-4 top-5" />
              </div>
            </div>

            {/* Imagem do Produto (Principal) */}
            <div className="space-y-2 col-span-1 mt-4">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Imagem Principal (Capa)</label>
              <div className="relative">
                {mainImage ? (
                  <div className="relative w-full h-40 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={mainImage} alt="Capa" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setMainImage("")} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition">✕</button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) processImage(e.target.files[0], setMainImage);
                  }} className="w-full h-14 pl-4 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium flex items-center pt-3" />
                )}
              </div>
              <p className="text-xs text-gray-500 ml-2 mt-1">Primeira imagem (obrigatória).</p>
            </div>

            {/* Imagem do Produto (Secundária) */}
            <div className="space-y-2 col-span-1 mt-4">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider ml-1">Imagem Secundária</label>
              <div className="relative">
                {secondaryImage ? (
                  <div className="relative w-full h-40 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={secondaryImage} alt="Secundária" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setSecondaryImage("")} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition">✕</button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) processImage(e.target.files[0], setSecondaryImage);
                  }} className="w-full h-14 pl-4 pr-4 bg-gray-50/50 rounded-2xl border border-gray-200 focus:bg-white focus:border-rosePrimary outline-none transition-all text-gray-800 font-medium flex items-center pt-3" />
                )}
              </div>
              <p className="text-xs text-gray-500 ml-2 mt-1">Segunda imagem (opcional).</p>
            </div>

          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/produtos')} className="text-gray-500 hover:text-gray-900 font-bold px-6">
            Voltar
          </Button>
          <Button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 rounded-2xl text-lg font-bold shadow-[0_8px_20px_rgb(37,99,235,0.2)] transition-all hover:-translate-y-1">
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
}
