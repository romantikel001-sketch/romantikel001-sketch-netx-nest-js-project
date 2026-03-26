"use client";

import { useCartLogic } from "@/hooks/use-cart-logic";
import { CartItem } from "@/app/types/cart";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartClient() {
  const { items, removeItem, total, totalQuantity } = useCartLogic();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-[1200px] mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-6">
          Корзина {items.length > 0 && <span className="text-gray-400 text-lg font-normal ml-2">{totalQuantity} шт.</span>}
        </h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
=            <CartItemsList items={items} onRemove={removeItem} />
            <CartSummary total={total} totalQuantity={totalQuantity} />
          </div>
        )}
      </main>
    </div>
  );
}

const CartItemsList = ({ items, onRemove }: { items: CartItem[], onRemove: (id: string) => void }) => (
  <div className="flex-1 w-full flex flex-col gap-4">
    {items.map((item) => (
      <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 relative">
        <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <h3 className="text-lg font-bold tracking-tight">{item.name}</h3>
          <div className="flex items-center gap-4 mt-auto">
            <span className="text-xl font-black">{item.price.toLocaleString()} ₸</span>
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              {item.quantity} шт.
            </span>
          </div>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    ))}
  </div>
);

const CartSummary = ({ total, totalQuantity }: { total: number, totalQuantity: number }) => (
  <div className="w-full lg:w-[360px] sticky top-24 bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm">
    <div className="flex justify-between mb-4">
      <span className="text-xl font-bold">Итого</span>
      <span className="text-3xl font-black tracking-tighter">{total.toLocaleString()} ₸</span>
    </div>
    <button className="w-full py-4 bg-slate-950 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-black transition-all">
      Оформить заказ
    </button>
  </div>
);

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">В корзине пока пусто</h2>
    <Link href="/home" className="px-8 py-3 bg-black text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-gray-800 transition-all">
      Перейти в каталог
    </Link>
  </div>
);