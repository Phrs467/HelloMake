"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // ID do produto
  name: string;
  price: number;
  imageUrl?: string;
  brandName?: string;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recupera do localStorage no Client-Side
  useEffect(() => {
    const saved = localStorage.getItem("@hellomake:cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Salva no localStorage sempre que alterar
  useEffect(() => {
    localStorage.setItem("@hellomake:cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((current) => {
      const exists = current.find(item => item.id === newItem.id);
      if (exists) {
        return current.map(item => 
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...current, newItem];
    });
    setIsCartOpen(true); // Abre o carrinho automaticamente
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(current => current.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen, total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
