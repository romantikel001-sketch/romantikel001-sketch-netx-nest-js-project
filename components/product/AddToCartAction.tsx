"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartActionProps {
  productId: string;
  price: number;
}

export default function AddToCartAction({ productId, price }: AddToCartActionProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      
      console.log(`Добавлено: ${productId}, количество: ${quantity}`);
    } catch (error) {
      console.error("Ошибка добавления в корзину", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-2 w-full sm:w-auto justify-between sm:justify-start">
        <button 
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-slate-100 disabled:opacity-50 transition-colors"
        >
          <Minus size={18} className="text-slate-900" />
        </button>
        
        <span className="w-16 text-center font-black text-lg text-slate-900">
          {quantity}
        </span>
        
        <button 
          onClick={handleIncrease}
          className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors"
        >
          <Plus size={18} className="text-slate-900" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="flex-1 w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-70"
      >
        <ShoppingCart size={18} />
        {isLoading ? "Добавляем..." : `В корзину • ${(price * quantity).toLocaleString()} ₸`}
      </button>
    </div>
  );
}