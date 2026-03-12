"use client";

import Image from "next/image";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  onAdd: (id: string) => void;
}

export function ProductCard({ id, name, price, image, onAdd }: ProductProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-4 hover:shadow-xl transition-shadow group">
      <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase">No Image</div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-900 leading-tight">{name}</h3>
        <p className="mt-auto text-xl font-black text-slate-950 pt-2">{price.toLocaleString()} ₸</p>
      </div>

      <button
        onClick={() => onAdd(id)}
        className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold active:scale-95 hover:bg-slate-800 transition-all"
      >
        В корзину
      </button>
    </div>
  );
}