"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.nome,
      price: Number(product.preco),
      quantity: 1,
      imageUrl: product.imagens && product.imagens.length > 0 ? product.imagens[0].url : '',
      brandName: product.marca?.nome || ''
    });
  };

  return (
    <Button 
      onClick={handleAddToCart}
      className="bg-gray-900 hover:bg-hotPink text-white h-14 px-8 rounded-full text-lg font-bold shadow-[0_8px_30px_rgb(233,30,99,0.2)] transition-all hover:-translate-y-1 w-full md:w-auto"
    >
      <ShoppingBag className="w-5 h-5 mr-3" />
      Adicionar à Sacola
    </Button>
  );
}
