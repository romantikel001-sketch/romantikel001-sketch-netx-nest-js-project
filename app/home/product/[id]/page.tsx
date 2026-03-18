// app/home/product/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartAction from "@/components/product/AddToCartAction";
import { Star } from "lucide-react";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  const reviews = [
    { id: 1, user: "Алиса", text: "Отличный товар, доставили быстро!", rating: 5 },
    { id: 2, user: "Илья", text: "Качество на уровне, советую.", rating: 4 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div className="bg-slate-50 rounded-[40px] border border-slate-100 p-8 flex items-center justify-center aspect-square overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="text-slate-300 font-black tracking-widest uppercase text-sm">Нет фото</div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6">
            В наличии
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {product.name}
          </h1>
          
          <p className="text-3xl font-black text-slate-900 mb-8">
            {product.price.toLocaleString()} ₸
          </p>

          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            {product.description || "Описание товара скоро появится. Мы работаем над этим."}
          </p>

          <AddToCartAction productId={product.id} price={product.price} />
        </div>
      </div>

      <div className="mt-24 border-t border-slate-100 pt-16">
        <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900 mb-8">Отзывы покупателей</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-8 bg-white border border-slate-200 rounded-[32px] hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-300"} />
                ))}
              </div>
              <p className="font-bold text-slate-900 mb-2">{rev.user}</p>
              <p className="text-slate-500 text-sm">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}