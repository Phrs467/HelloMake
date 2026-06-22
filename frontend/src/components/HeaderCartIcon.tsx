"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export function HeaderCartIcon() {
  const { setIsCartOpen, items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="flex items-center justify-center w-12 h-12 rounded-full text-[#4A4A4A] hover:text-hotPink hover:bg-pink-100 transition-all duration-300 relative group"
    >
      <ShoppingBag className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
      {totalItems > 0 && (
        <span className="absolute top-1 right-1 w-5 h-5 bg-hotPink text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
