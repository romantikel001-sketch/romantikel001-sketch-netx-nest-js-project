import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "@/components/home/layout/header/Header";
import BalanceWidget from "@/components/profile/widgets/balance-widget";
import { ProductCard } from "@/components/ui/ProductCard"; 
import { AddProductForm } from "@/components/AddProductForm"; 

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { products: { orderBy: { createdAt: 'desc' } } },
  });

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          <aside className="md:col-span-4 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-3xl font-black text-white shrink-0">
                {user.name?.[0] || "U"}
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">{user.name}</h1>
                <p className="text-slate-500 text-sm mt-1">{user.email}</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-100">
              <BalanceWidget amount={user.balance} />
            </div>
          </aside>

          <main className="md:col-span-8 space-y-10">
            <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Выставить товар</h2>
              <AddProductForm sellerId={user.id} />
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 ml-2">
                Мои объявления ({user.products.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product}
                    description={product.description ?? ""}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </main>
    </div>
  );
}