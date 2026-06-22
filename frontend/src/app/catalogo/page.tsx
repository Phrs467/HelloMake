import Link from "next/link";
import { Filter, Sparkles, SlidersHorizontal, ChevronDown } from "lucide-react";
import { HeaderCartIcon } from "@/components/HeaderCartIcon";
import { CatalogClient } from "@/components/CatalogClient";
import { Footer } from "@/components/Footer";

import { API_BASE_URL } from "@/lib/constants";

export const dynamic = 'force-dynamic';

export default async function Catalogo({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const resolvedParams = await searchParams;
  const categoriaFiltro = resolvedParams.categoria;

  let products = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products`, { cache: "no-store" });
    if (res.ok) {
      products = await res.json();
      if (categoriaFiltro) {
        products = products.filter((p: any) => p.categoria?.nome === categoriaFiltro);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar produtos do banco:", error);
  }

  const categoriasFalsas = ["Maquiagem", "Skincare", "Perfumaria", "Kits Especiais"];

  return (
    <main className="min-h-screen bg-[#FFF0F5] text-charcoal font-inter pb-24">
      
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-pink-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="Hello Make e Acessórios" 
              className="h-12 w-auto object-contain drop-shadow-sm mix-blend-multiply" 
            />
          </Link>
          
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

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-sm font-bold tracking-widest text-rosePrimary uppercase mb-3">Toda a Coleção</h2>
          <h1 className="text-5xl md:text-6xl font-outfit font-black text-[#2D2D2D] tracking-tight">
            Descubra sua <span className="font-serif italic font-normal text-hotPink">Beleza</span>
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto mt-4 font-light">
            Navegue por nossas categorias exclusivas de maquiagem e skincare. Filtre pelas melhores marcas e encontre o seu match perfeito.
          </p>
        </div>
      </section>

      {/* ÁREA DE CONTEÚDO */}
      <CatalogClient initialProducts={products} categoriasFalsas={categoriasFalsas} categoriaFiltro={categoriaFiltro} />

      <Footer />
    </main>
  );
}
