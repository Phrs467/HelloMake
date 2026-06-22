"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Eye, PackageCheck } from "lucide-react";

import { API_BASE_URL } from "@/lib/constants";

export default function ListaPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/orders`);
        if (res.ok) {
          setOrders(await res.json());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAYMENT_PENDING':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Aguardando Pgto</span>;
      case 'SHIPPED':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Enviado</span>;
      case 'DELIVERED':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Entregue</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-outfit font-black tracking-tight text-gray-900">Vendas</h1>
          </div>
          <p className="text-gray-500 text-lg ml-14">Acompanhe os pedidos realizados pelos clientes.</p>
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">ID / Data</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Cliente</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Total</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="py-12 text-center text-gray-400 font-medium">Carregando pedidos...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="py-12 text-center text-gray-400 font-medium">Nenhum pedido recebido ainda.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-pink-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900 group-hover:text-rosePrimary transition-colors font-mono text-sm">
                      #{order.id.substring(0,8)}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')} às {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <p className="font-bold text-gray-800">{order.user?.name}</p>
                    <p className="text-xs text-gray-500">{order.user?.email}</p>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-gray-800">
                    R$ {Number(order.totalAmount).toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/admin/pedidos/${order.id}`}>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-rosePrimary hover:bg-pink-50">
                        <Eye className="w-5 h-5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
