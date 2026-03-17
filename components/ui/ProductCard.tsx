"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/app/actions/cart";
import { ShoppingCart, Check } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image?: string | null;
}

export function ProductCard({ id, name, description, price, image }: ProductProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart(id, 1); 
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error("Ошибка корзины", error);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col hover:shadow-md transition-all group">
      <Link href={`/home/product/${id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-3">
          {image ? (
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">
              нет фото
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{name}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 mb-2 min-h-[32px]">
            {description || "Описание временно отсутствует"}
          </p>
          <p className="mt-auto text-lg font-black text-slate-950">{price.toLocaleString()} ₸</p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className={`w-full mt-3 py-2 text-white text-sm rounded-xl font-semibold active:scale-95 transition-all flex items-center justify-center gap-2
          ${isAdded ? "bg-green-500" : "bg-slate-900 hover:bg-black"}
        `}
      >
        {isAdded ? (
          <>
            <Check size={16} />
            Добавлено
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            В корзину
          </>
        )}
      </button>
    </div>
  );
}