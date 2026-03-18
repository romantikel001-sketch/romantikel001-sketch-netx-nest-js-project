import prisma from "@/lib/prisma";
import Image from "next/image";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-zinc-400 font-black uppercase">
        Товар не найден
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">            
            <div>
              <h1 className="text-3xl font-black leading-tight mb-3">
                {product.name}
              </h1>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {product.description || "Описание товара."}
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="sticky top-28 p-6 rounded-[28px] bg-white border border-zinc-200 shadow-lg space-y-6">
              <div>
                <p className="text-3xl font-black">
                  {product.price.toLocaleString()} ₸
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-5 bg-black text-white rounded-xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition active:scale-95">
                  <ShoppingCart size={18} />
                  В корзину
                </button>
                <button className="w-full py-5 bg-zinc-100 text-black rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-zinc-200 transition">
                  Купить сейчас
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-300 flex justify-center text-xs text-zinc-500">
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-black transition">
                  <Heart size={18} />
                  <span>В избранное</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}