"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, total } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay Escuro */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col animate-in slide-in-from-right">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-pink-50">
          <h2 className="text-2xl font-outfit font-black tracking-tight text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-hotPink" />
            Sua Sacola
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-bold text-gray-500">Sua sacola está vazia.</p>
              <p className="text-sm text-gray-400">Adicione alguns produtos incríveis!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-pink-50/50">
                
                {/* Imagem */}
                <div className="w-20 h-24 bg-pink-50 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-6 h-6 text-pink-200" />
                  )}
                </div>

                {/* Infos */}
                <div className="flex flex-col flex-1 py-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brandName || "Hello Make"}</span>
                  <h4 className="font-bold text-gray-800 leading-tight mt-1 line-clamp-2">{item.name}</h4>
                  <p className="text-rosePrimary font-black mt-1">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
                  
                  {/* Controles de Quantidade */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-wider underline underline-offset-2">
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Resumo e Checkout) */}
        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-gray-900">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
              <Button className="w-full h-14 bg-rosePrimary hover:bg-hotPink text-white text-lg font-bold rounded-2xl shadow-[0_8px_30px_rgb(233,30,99,0.3)] transition-all hover:-translate-y-1">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        )}

      </div>
    </>
  );
}
