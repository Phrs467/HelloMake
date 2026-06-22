"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, User, MapPin, Truck, ChevronLeft } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function DetalhesPedido({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/orders/${orderId}`);
        if (res.ok) {
          setOrder(await res.json());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [orderId]);

  async function updateStatus(newStatus: string) {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrder({ ...order, status: newStatus });
      } else {
        alert("Erro ao atualizar status.");
      }
    } catch (err) {
      alert("Erro de conexão ao atualizar status.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !order) return <div className="p-8 text-gray-500">Carregando detalhes...</div>;

  const address = JSON.parse(order.shippingAddress || '{}');

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/pedidos">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 bg-white rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-black text-gray-900">Pedido <span className="font-mono text-rosePrimary">#{order.id.substring(0,8)}</span></h1>
            <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString('pt-BR')}</p>
          </div>
        </div>
        
        {/* Controle de Status */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Status:</span>
           <select 
              value={order.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={saving}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-sm font-bold rounded-xl focus:ring-rosePrimary focus:border-rosePrimary block p-2.5 outline-none"
            >
              <option value="PAYMENT_PENDING">Aguardando Pagamento</option>
              <option value="PAYMENT_APPROVED">Pagamento Aprovado</option>
              <option value="SHIPPED">Enviado (Correios)</option>
              <option value="DELIVERED">Entregue</option>
              <option value="CANCELED">Cancelado</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Resumo dos Itens (Esquerda 2/3) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-outfit font-bold text-xl mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-hotPink" /> Itens do Pedido
            </h3>
            
            <div className="space-y-4">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{item.variant?.product?.name || 'Produto Não Identificado'}</span>
                    <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900">R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.',',')}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-end">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Pago</span>
              <span className="text-3xl font-black text-rosePrimary">R$ {Number(order.totalAmount).toFixed(2).replace('.',',')}</span>
            </div>
          </div>
        </div>

        {/* Informações do Cliente (Direita 1/3) */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-outfit font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
              <User className="w-4 h-4 text-hotPink" /> Cliente
            </h3>
            <p className="font-bold text-gray-900">{order.user?.name}</p>
            <p className="text-sm text-gray-500 mt-1">{order.user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">{order.user?.phone}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-outfit font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
              <MapPin className="w-4 h-4 text-hotPink" /> Entrega
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900 mb-2">CEP: {address.zip}</p>
              <p>{address.street}, {address.number}</p>
              <p>{address.city} - {address.state}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
