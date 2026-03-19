import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default async function CartPage() {
  const userId = "test-user-id";
  
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });

  async function deleteItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.cartItem.delete({ where: { id } });
    revalidatePath("/home/cart");
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-[1200px] mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-6">
          Корзина {items.length > 0 && <span className="text-gray-400 text-lg font-normal ml-2">{totalQuantity} шт.</span>}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-200">
            <h2 className="text-2xl font-bold mb-4">В корзине пока пусто</h2>
            <p className="text-gray-500 mb-8">Загляните в каталог, чтобы выбрать товары</p>
            <Link href="/home" className="px-8 py-3 bg-black text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-gray-800 transition-colors">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            <div className="flex-1 w-full flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 relative">
                  
                  <div className="w-24 h-32 sm:w-28 sm:h-36 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">Нет фото</div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold leading-tight pr-8 tracking-tight">{item.product.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 uppercase font-medium">Арт: {item.product.id.slice(0, 8)}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <span className="text-xl font-black tracking-tighter">{item.product.price.toLocaleString()} ₸</span>
                      <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {item.quantity} шт.
                      </span>
                    </div>
                  </div>

                  <form action={deleteItem} className="absolute top-4 right-4">
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={20} />
                    </button>
                  </form>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[320px] xl:w-[360px] sticky top-24 shrink-0">
              <div className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm">
                
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xl font-bold">Итого</span>
                  <span className="text-3xl font-black tracking-tighter">{total.toLocaleString()} ₸</span>
                </div>
                
                <div className="space-y-3 text-sm text-slate-500 mb-6 font-medium">
                  <div className="flex justify-between">
                    <span>Товары, {totalQuantity} шт.</span>
                    <span>{total.toLocaleString()} ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className="text-green-600 font-bold uppercase text-[10px]">Бесплатно</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-slate-950 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200">
                  Оформить заказ
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}