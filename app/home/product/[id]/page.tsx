import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Share2 } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">
          
          {/* ЛЕВАЯ ЧАСТЬ: ФОТО */}
          <div className="lg:col-span-7 w-full lg:sticky lg:top-32">
            <div className="relative aspect-square lg:aspect-[4/5] bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full pt-4">
            <div className="mb-10">
              <nav className="flex gap-2 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                <span className="hover:text-white cursor-pointer transition">Магазин</span>
                <span>/</span>
                <span className="text-zinc-400">{product.name}</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-zinc-100">
                {product.price.toLocaleString()} ₸
              </p>
            </div>

            <div className="mb-12 border-t border-zinc-900 pt-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-5 text-zinc-500">
                Описание товара
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium max-w-xl">
                {product.description || "Минималистичный дизайн и безупречное качество исполнения."}
              </p>
            </div>

            <div className="mt-auto space-y-4 max-w-md w-full">
              
              <AddToCartButton product={product} />

              <button className="w-full py-5 bg-zinc-900 text-white rounded-2xl border border-zinc-800 font-black uppercase text-[11px] tracking-widest hover:bg-zinc-800 transition active:scale-95">
                Купить в один клик
              </button>

              <div className="pt-6 flex items-center justify-center gap-8 border-t border-zinc-900">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <Heart size={18} className="text-zinc-500 group-hover:text-white transition" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition">
                    В избранное
                  </span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <Share2 size={18} className="text-zinc-500 group-hover:text-white transition" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition">
                    Поделиться
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}