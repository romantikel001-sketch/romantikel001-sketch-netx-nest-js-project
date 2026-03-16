"use client";

import { createProduct } from "@/app/actions/products";
import { useRef } from "react";

export function AddProductForm({ sellerId }: { sellerId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createProduct(formData);
        formRef.current?.reset(); 
      }}
      className="space-y-5"
    >
      <input type="hidden" name="sellerId" value={sellerId} />
      
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Фото товара</label>
        <div className="relative group">
          <input 
            type="file" 
            name="image"
            accept="image/*" 
            className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2 text-sm text-slate-900 
                     file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 
                     file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-900 
                     hover:file:bg-slate-200 cursor-pointer shadow-sm
                     focus:ring-2 focus:ring-slate-900 outline-none transition"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Название</label>
        <input 
          type="text" 
          name="name"
          required
          placeholder="Например: MacBook Air M2"
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Описание</label>
        <textarea 
          name="description"
          placeholder="Опишите состояние товара..."
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition shadow-sm min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Цена (₸)</label>
        <input 
          type="number" 
          name="price"
          required
          placeholder="500 000"
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition shadow-sm"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black active:scale-[0.98] transition-all uppercase text-xs tracking-[0.1em] shadow-lg shadow-slate-200"
      >
        Опубликовать товар
      </button>
    </form>
  );
}