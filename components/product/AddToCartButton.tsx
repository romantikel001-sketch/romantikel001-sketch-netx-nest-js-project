"use client";

import { useCart } from "@/app/store/useCart";
import { IProduct } from "@/app/types/product";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: IProduct; 
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={isAdded}
      className={`
        w-full py-6 rounded-[22px] font-black uppercase text-[11px] tracking-[0.3em] 
        flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-xl
        ${isAdded 
          ? "bg-zinc-800 text-zinc-400 cursor-default" 
          : "bg-[#f4f4f5] text-black hover:bg-white transition-colors shadow-white/5"
        }
      `}
    >
      <ShoppingCart size={18} />
      {isAdded ? "Добавлено" : "Добавить в корзину"}
    </button>
  );
}