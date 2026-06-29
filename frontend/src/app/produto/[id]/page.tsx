import Link from "next/link";
import { Sparkles, ChevronLeft, MessageCircle } from "lucide-react";
import { HeaderCartIcon } from "@/components/HeaderCartIcon";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ImageZoom } from "@/components/ImageZoom";
import { AlertCircle } from "lucide-react";
import { Footer } from "@/components/Footer";

import { API_BASE_URL } from "@/lib/constants";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let product: any = null;
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${productId}`, { cache: 'no-store' });
    if (res.ok) {
      product = await res.json();
    }
  } catch (err) {
    console.error("Erro ao buscar detalhes do produto", err);
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDF0F5]">Produto não encontrado.</div>;
  }

  const whatsappNumber = "5562982882075";
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de comprar o produto: *${product.nome}* (R$ ${Number(product.preco).toFixed(2).replace('.', ',')}). Ainda tem disponível?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#FFF0F5] text-charcoal font-inter">

      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-pink-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/catalogo" className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 transition-colors text-hotPink">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="flex items-center hidden md:flex">
              <img
                src="/logo.jpg"
                alt="Hello Make e Acessórios"
                className="h-12 w-auto object-contain drop-shadow-sm mix-blend-multiply"
              />
            </Link>
          </div>

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 font-medium text-[15px] tracking-wide">
            <Link href="/catalogo" className="group font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-pink-100 hover:text-hotPink text-[#4A4A4A] flex items-center justify-center">
              <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">Catálogo</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <HeaderCartIcon />
          </div>
        </div>
      </header>

      {/* Product Content */}
      <section className="pt-32 pb-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Coluna da Imagem */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white relative shadow-xl shadow-pink-100/50 border-4 border-white ring-1 ring-pink-200">
              {product.imagens && product.imagens.length > 0 ? (
                <ImageZoom src={product.imagens[0].url} alt={product.nome} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#FFF0F5]">
                  <div className="absolute w-64 h-64 bg-pink-200/50 rounded-full blur-3xl top-20 left-20"></div>
                  <div className="text-hotPink/30 font-bold tracking-widest uppercase opacity-50 rotate-[-45deg] text-5xl">Foto aqui</div>
                </div>
              )}
            </div>
          </div>

          {/* Coluna das Informações */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 py-4">

            {/* Bloco Título e Preço */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-pink-100/40 border border-pink-200">
              <span className="inline-block px-4 py-1.5 bg-pink-100 text-[#D81B60] rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-sm shadow-pink-100">
                {product.categoria?.nome || "Lançamento"}
              </span>
              <p className="text-sm font-bold text-hotPink/80 tracking-widest uppercase mb-2">
                {product.marca?.nome || "Exclusivo"}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black tracking-tight leading-tight text-gray-900 mb-6">
                {product.nome}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                {product.estoque > 0 ? (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${product.estoque <= 5 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    <AlertCircle className="w-4 h-4" />
                    {product.estoque <= 5 ? `Corra! Apenas ${product.estoque} em estoque` : `${product.estoque} unidades disponíveis`}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="w-4 h-4" />
                    Esgotado
                  </div>
                )}
              </div>

              <div className="flex items-end gap-3 pt-6 border-t border-pink-100">
                <span className="text-5xl md:text-6xl font-black text-[#D81B60]">
                  <span className="text-2xl text-hotPink/60 mr-2">R$</span>
                  {Number(product.preco).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Bloco Descrição */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-pink-100/40 border border-pink-200 space-y-4">
              <h3 className="font-outfit font-black text-xl text-[#D81B60] flex items-center gap-2 mb-4">Sobre o Produto</h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {product.descricao}
              </p>
            </div>

            {/* Bloco Ações (Botões) */}
            <div className="mt-2 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-1/2">
                <AddToCartButton product={product} />
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 h-14 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-[#1DA851] hover:-translate-y-1 transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                Comprar via WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
