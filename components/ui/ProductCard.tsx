"use client";

import Image from "next/image";
import { addToCart } from "@/app/actions/cart";

interface ProductProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image?: string | null;
}

export function ProductCard({ id, name, description, price, image }: ProductProps) {
  const userId = "test-user-id";

  const handlePress = async () => {
    try {
      await addToCart(id, userId);
    } catch (error) {
      console.error("Не удалось добавить в корзину", error);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col hover:shadow-md transition-all group">
      <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-3">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">
            нет фото
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-2 min-h-[32px]">
          {description || "Описание временно отсутствует"}
        </p>
        <p className="mt-auto text-lg font-black text-slate-950">{price.toLocaleString()} ₸</p>
      </div>

      <button
        onClick={handlePress}
        className="w-full mt-3 py-2 bg-slate-900 text-white text-sm rounded-xl font-semibold active:scale-95 hover:bg-black transition-all"
      >
        В корзину
      </button>
    </div>
  );
}