"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function CatalogClient({ initialProducts, categoriasFalsas, categoriaFiltro }: { initialProducts: any[], categoriasFalsas: string[], categoriaFiltro?: string }) {
  const router = useRouter();
  
  // Local state for filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
  const [isCategoriasOpen, setIsCategoriasOpen] = useState(true);
  const [isMarcasOpen, setIsMarcasOpen] = useState(true);
  
  const sortedCategorias = useMemo(() => {
    return [...categoriasFalsas].sort((a, b) => a.localeCompare(b));
  }, [categoriasFalsas]);
  
  // Extract unique brands from initial products
  const uniqueBrands = useMemo(() => {
    const brands = initialProducts.map(p => p.marca?.nome).filter(Boolean);
    return (Array.from(new Set(brands)) as string[]).sort((a, b) => a.localeCompare(b));
  }, [initialProducts]);

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    let result = [...initialProducts];
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.marca?.nome));
    }
    
    if (sortOrder === 'asc') {
      result.sort((a, b) => Number(a.preco) - Number(b.preco));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => Number(b.preco) - Number(a.preco));
    }
    
    return result;
  }, [initialProducts, selectedBrands, sortOrder]);

  return (
    <section className="container mx-auto px-4 relative z-10">
      
      {/* Barra de Ferramentas */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/50 backdrop-blur-md rounded-2xl p-4 mb-8 shadow-sm border-2 border-pink-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <SlidersHorizontal className="w-4 h-4 text-hotPink" /> 
            Mostrando {displayedProducts.length} {displayedProducts.length === 1 ? 'produto' : 'produtos'}
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Ordenar por:</span>
            <div className="relative group">
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm border-2 border-pink-100 hover:border-hotPink transition-colors">
                {sortOrder === '' ? 'Relevância' : sortOrder === 'asc' ? 'Menor para o Maior' : 'Maior para o Menor'} <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-pink-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden">
                <button onClick={() => setSortOrder('')} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 font-medium">Relevância</button>
                <button onClick={() => setSortOrder('asc')} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 font-medium">Menor para o Maior</button>
                <button onClick={() => setSortOrder('desc')} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 font-medium">Maior para o Menor</button>
              </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-pink-100 rounded-[2rem] p-8 sticky top-28 border-2 border-pink-200 shadow-sm shadow-pink-200/50">
            <h3 className="font-outfit font-black text-xl text-[#D81B60] mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </h3>
            
            <div className="mb-8 border-b border-pink-200/50 pb-6">
              <button 
                onClick={() => setIsCategoriasOpen(!isCategoriasOpen)}
                className="flex items-center justify-between w-full font-bold text-sm mb-4 tracking-widest text-charcoal/40 uppercase hover:text-hotPink transition-colors"
              >
                <span>Categoria</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoriasOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`space-y-2 overflow-y-auto custom-scrollbar transition-all duration-300 ${isCategoriasOpen ? 'max-h-[300px] opacity-100 pr-2' : 'max-h-0 opacity-0'}`}>
                <button 
                  onClick={() => router.push('/catalogo')}
                  className={`flex items-center gap-3 p-3 rounded-xl w-full cursor-pointer transition-all duration-200 border ${
                    !categoriaFiltro 
                      ? 'bg-white border-pink-200 shadow-sm text-hotPink font-bold scale-[1.02]' 
                      : 'bg-transparent border-transparent hover:bg-pink-50/50 hover:border-pink-100 text-gray-700 font-medium'
                  }`}
                >
                  <div className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                    !categoriaFiltro 
                      ? 'bg-[#D81B60] border-[#D81B60] scale-110 shadow-md shadow-pink-200/50' 
                      : 'bg-white border-pink-300 hover:border-hotPink'
                  }`}>
                    {!categoriaFiltro && <Check className="w-3.5 h-3.5 text-white stroke-[3.5] animate-in zoom-in-50 duration-200" />}
                  </div>
                  <span className="text-left text-sm">Todas</span>
                </button>
                {sortedCategorias.map(cat => {
                  const isSelected = categoriaFiltro === cat;
                  return (
                    <button 
                      key={cat} 
                      onClick={() => router.push(`/catalogo?categoria=${cat}`)}
                      className={`flex items-center gap-3 p-3 rounded-xl w-full cursor-pointer transition-all duration-200 border ${
                        isSelected 
                          ? 'bg-white border-pink-200 shadow-sm text-hotPink font-bold scale-[1.02]' 
                          : 'bg-transparent border-transparent hover:bg-pink-50/50 hover:border-pink-100 text-gray-700 font-medium'
                      }`}
                    >
                      <div className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#D81B60] border-[#D81B60] scale-110 shadow-md shadow-pink-200/50' 
                          : 'bg-white border-pink-300 hover:border-hotPink'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3.5] animate-in zoom-in-50 duration-200" />}
                      </div>
                      <span className="text-left text-sm">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {uniqueBrands.length > 0 && (
              <div className="mb-8 border-b border-pink-200/50 pb-6">
                <button 
                  onClick={() => setIsMarcasOpen(!isMarcasOpen)}
                  className="flex items-center justify-between w-full font-bold text-sm mb-4 tracking-widest text-charcoal/40 uppercase hover:text-hotPink transition-colors"
                >
                  <span>Marcas</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMarcasOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`space-y-2 overflow-y-auto custom-scrollbar transition-all duration-300 ${isMarcasOpen ? 'max-h-[300px] opacity-100 pr-2' : 'max-h-0 opacity-0'}`}>
                  {uniqueBrands.map(brand => {
                    const isSelected = selectedBrands.includes(brand);
                    return (
                      <button 
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`flex items-center gap-3 p-3 rounded-xl w-full cursor-pointer transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-white border-pink-200 shadow-sm text-hotPink font-bold scale-[1.02]' 
                            : 'bg-transparent border-transparent hover:bg-pink-50/50 hover:border-pink-100 text-gray-700 font-medium'
                        }`}
                      >
                        <div className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected 
                            ? 'bg-[#D81B60] border-[#D81B60] scale-110 shadow-md shadow-pink-200/50' 
                            : 'bg-white border-pink-300 hover:border-hotPink'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3.5] animate-in zoom-in-50 duration-200" />}
                        </div>
                        <span className="text-left text-sm">{brand}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <Button onClick={() => { setSelectedBrands([]); setSortOrder(''); router.push('/catalogo'); }} variant="outline" className="w-full h-12 border-pink-200 text-hotPink hover:bg-pink-50 rounded-xl">
                Limpar Filtros
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-pink-100 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-3xl font-outfit font-black text-[#2D2D2D] mb-4">Nenhum produto por aqui...</h2>
              <Link href="/admin/produtos/novo" className="mt-8">
                <Button className="bg-[#2D2D2D] hover:bg-hotPink text-white rounded-full px-8 h-14 text-lg font-medium">
                  Cadastrar Produto
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProducts.map((item: any) => (
                <Link 
                  key={item.id} 
                  href={`/produto/${item.id}`}
                  className="group flex flex-col bg-white rounded-[2rem] p-3 pb-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50 border-2 border-pink-100 hover:border-pink-400"
                >
                  <div className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden mb-5 bg-[#FFF0F5]">
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold text-hotPink uppercase tracking-wider shadow-sm">
                          {item.categoria?.nome || "Lançamento"}
                        </span>
                    </div>
                    
                    {/* Imagem Real */}
                    <div className="w-full h-full bg-gradient-to-br from-[#FFF0F5] to-white flex items-center justify-center relative overflow-hidden">
                      {item.imagens && item.imagens.length > 0 ? (
                        <img src={item.imagens[0].url} alt={item.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <>
                          <div className="absolute w-40 h-40 bg-pink-200/40 rounded-full blur-2xl top-10 left-10 group-hover:translate-x-4 transition-transform duration-700"></div>
                          <div className="absolute w-32 h-32 bg-white/60 rounded-full blur-xl bottom-10 right-10 group-hover:-translate-y-4 transition-transform duration-700"></div>
                          <div className="text-gray-300 font-bold tracking-widest uppercase opacity-20 rotate-[-45deg] text-3xl">Foto aqui</div>
                        </>
                      )}
                    </div>

                    <div className="absolute inset-x-4 bottom-4 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                      <Button className="w-full bg-[#2D2D2D]/95 backdrop-blur-md hover:bg-hotPink text-white rounded-2xl h-12 shadow-lg">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col px-3">
                    <span className="text-[11px] font-black text-hotPink uppercase tracking-widest mb-1.5">
                      {item.marca?.nome || "Marca Exclusiva"}
                    </span>
                    <h4 className="font-bold text-gray-800 text-lg leading-snug mb-2 group-hover:text-[#D81B60] transition-colors line-clamp-2">
                      {item.nome}
                    </h4>
                    <p className="text-[22px] font-black text-[#D81B60] mt-auto flex items-center">
                      <span className="text-sm font-bold text-[#D81B60]/60 mr-1 mt-1">R$</span>
                      {Number(item.preco).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
