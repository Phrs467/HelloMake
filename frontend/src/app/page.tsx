import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { ShoppingBag, Star, TrendingUp, Truck, Sparkles, Heart } from "lucide-react";
import { HeaderCartIcon } from "@/components/HeaderCartIcon";
import { Footer } from "@/components/Footer";

import { API_BASE_URL } from "@/lib/constants";

export default async function Home() {
  let trendingProducts = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products`, { cache: "no-store" });
    if (res.ok) {
      const allProducts = await res.json();
      // Embaralha os produtos reais e pega 4 (ou menos se não tiver 4)
      trendingProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
    }
  } catch (error) {
    console.error("Erro ao buscar produtos para Home:", error);
  }

  return (
    <main className="min-h-screen bg-[#F5D0DA] text-[#2D2D2D] font-inter overflow-x-hidden">
      
      {/* HEADER GLASSMORPHISM */}
      <header className="fixed top-0 z-50 w-full glass border-b border-white shadow-sm transition-all duration-300">
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

      {/* CATEGORIAS COMO DESTAQUE PRINCIPAL (HERO) */}
      <section className="pt-32 pb-24 bg-[#FFF0F5] relative overflow-hidden min-h-screen flex items-center">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFE4E1] rounded-full blur-[120px] opacity-80 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#F8BBD0] rounded-full blur-[100px] opacity-60 mix-blend-multiply" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-outfit font-black text-[#2D2D2D] leading-[1.05] tracking-tight">
              O que você procura <br/> <span className="text-hotPink font-serif italic font-normal">hoje?</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-sm mb-4">Selecione sua categoria favorita e descubra os melhores produtos para realçar sua beleza.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categoria 1 (Maquiagem) */}
            <Link href="/catalogo?categoria=Maquiagem" className="group relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden bg-[#FFF0F5] cursor-pointer transition-transform duration-500 hover:-translate-y-2 block shadow-xl shadow-pink-100 border border-white">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Maquiagem</h3>
                <p className="text-white/80 font-medium opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Bases, Batons e Paletas</p>
              </div>
            </Link>
            
            {/* Categoria 2 (Skincare) */}
            <Link href="/catalogo?categoria=Skincare" className="group relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden bg-[#E0F2F1] cursor-pointer transition-transform duration-500 hover:-translate-y-2 block shadow-xl shadow-pink-100 border border-white">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Skincare</h3>
                <p className="text-white/80 font-medium opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Hidratação e Cuidados</p>
              </div>
            </Link>

            {/* Categoria 3 (Perfumaria) */}
            <Link href="/catalogo?categoria=Perfumaria" className="group relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden bg-[#FFF3E0] cursor-pointer transition-transform duration-500 hover:-translate-y-2 block shadow-xl shadow-pink-100 border border-white">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Perfumaria</h3>
                <p className="text-white/80 font-medium opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Fragrâncias Marcantes</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUTOS TRENDING - DESIGN LUXUOSO */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-rosePrimary uppercase mb-3">Trending Now</h2>
          <h3 className="text-4xl md:text-5xl font-outfit font-black text-[#2D2D2D]">Mais Desejados</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.length > 0 ? trendingProducts.map((item: any) => (
            <Link href={`/produto/${item.id}`} key={item.id} className="group flex flex-col bg-transparent">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-white shadow-sm border border-pink-50 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(233,30,99,0.15)] group-hover:-translate-y-2">
                <div className="absolute top-4 right-4 z-20">
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#4A4A4A] hover:text-hotPink hover:scale-110 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Imagem Real */}
                <div className="w-full h-full bg-gradient-to-br from-[#FFF0F5] to-white flex items-center justify-center relative overflow-hidden">
                  {item.imagens && item.imagens.length > 0 ? (
                    <img src={item.imagens[0].url} alt={item.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <>
                      <div className="absolute w-32 h-32 bg-pink-200/40 rounded-full blur-xl top-10 left-10"></div>
                      <div className="text-gray-300 font-bold tracking-widest uppercase opacity-20 rotate-[-45deg] text-xl">Foto aqui</div>
                    </>
                  )}
                </div>
                
                {/* Overlay Add to cart */}
                <div className="absolute inset-x-4 bottom-4 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                  <Button className="w-full bg-[#2D2D2D]/90 backdrop-blur-md hover:bg-hotPink text-white rounded-2xl h-12 shadow-lg">
                    Ver Produto
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col text-center px-2">
                <span className="text-xs font-bold text-hotPink uppercase tracking-wider mb-1">
                  {item.marca?.nome || "Exclusivo"}
                </span>
                <h4 className="font-bold text-[#2D2D2D] text-lg mb-2 line-clamp-2">{item.nome}</h4>
                <p className="text-xl font-black text-[#D81B60]">
                   <span className="text-sm mr-1 opacity-70">R$</span>
                   {Number(item.preco).toFixed(2).replace('.', ',')}
                </p>
              </div>
            </Link>
          )) : (
             <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500 py-10">
               Nenhum produto encontrado. Adicione produtos no painel administrativo!
             </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/catalogo">
            <Button variant="outline" size="lg" className="rounded-full px-12 h-14 border-2 border-[#2D2D2D] text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white font-bold tracking-wide transition-all">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
