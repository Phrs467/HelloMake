"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, User, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutWhatsAppPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const WHATSAPP_NUMBER = "5562982882075";

  function handleSendToWhatsApp(e: React.FormEvent) {
    e.preventDefault();

    let message = `*Olá! Gostaria de fazer um pedido.* 🛍️\n\n`;
    message += `*Meu Nome:* ${name}\n`;
    message += `*Cidade/Bairro:* ${city}\n\n`;
    message += `*ITENS DO PEDIDO:*\n`;

    items.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n*Valor Total (sem frete):* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += `Podemos fechar e calcular a entrega?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    // Limpa o carrinho após enviar (opcional, mas bom para UX)
    clearCart();
    router.push("/catalogo");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-gray-500 text-xl mb-6">Sua sacola está vazia.</p>
        <Link href="/catalogo">
          <Button className="bg-[#2D2D2D] hover:bg-black text-white px-8 h-12 rounded-full">Explorar Produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0F5] font-inter pt-20 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="flex items-center justify-center gap-3 mb-10 text-gray-800">
          <MessageCircle className="w-8 h-8 text-[#25D366]" />
          <h1 className="text-4xl font-outfit font-black tracking-tight">Finalizar pelo WhatsApp</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Identificação Simples */}
          <div className="flex-1">
            <form id="wa-form" onSubmit={handleSendToWhatsApp} className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-50">
                <p className="text-gray-500 mb-6 text-sm">
                  Preencha os dados abaixo para enviarmos a lista do seu carrinho direto para a nossa equipe no WhatsApp!
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Como podemos te chamar?</label>
                    <input
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type="text"
                      placeholder="Seu Nome Completo"
                      className="w-full h-14 px-4 bg-gray-50 rounded-xl border border-transparent focus:border-green-400 focus:bg-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Qual sua localização?</label>
                    <input
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      type="text"
                      placeholder="Cidade e Bairro (Para calcularmos a entrega)"
                      className="w-full h-14 px-4 bg-gray-50 rounded-xl border border-transparent focus:border-green-400 focus:bg-white outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Resumo da Lista */}
          <aside className="w-full lg:w-[400px]">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#25D366]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366] blur-[60px] opacity-20 rounded-full"></div>

              <h3 className="font-outfit font-bold text-xl mb-6 relative z-10">Sua Lista de Compras</h3>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 relative z-10">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-500">{item.quantity}x</span>
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-[180px]">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900 text-lg">Total em Produtos</span>
                  <span className="font-black text-[#25D366] text-3xl">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <Button
                form="wa-form"
                type="submit"
                className="w-full h-14 bg-[#25D366] hover:bg-[#1DA851] text-white text-lg font-bold rounded-2xl shadow-[0_8px_30px_rgb(37,211,102,0.3)] transition-all hover:-translate-y-1 relative z-10"
              >
                Enviar para o WhatsApp <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
