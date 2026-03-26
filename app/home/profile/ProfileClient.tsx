"use client";

import { useState } from "react";
import BalanceWidget from "@/components/profile/widgets/balance-widget";
import { ProductCard } from "@/components/ui/ProductCard"; 
import { AddProductForm } from "@/components/AddProductForm";
import { Package, ShoppingBag, PlusCircle } from "lucide-react";

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description?: string | null;
  createdAt: Date | string;
}

interface ProfileClientProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    balance: number;
  };
  products: IProduct[];
}

type TabType = "my-ads" | "purchases" | "create-ad";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isAction?: boolean;
}

export default function ProfileClient({ user, products }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("my-ads");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <main className="max-w-[1400px] mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          <aside className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-3xl font-black text-white shrink-0">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
                    {user.name}
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">{user.email}</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100">
                <BalanceWidget amount={user.balance} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-[32px] border border-slate-200 shadow-sm">
              <nav className="flex flex-col gap-2">
                <TabButton 
                  isActive={activeTab === "my-ads"} 
                  onClick={() => setActiveTab("my-ads")} 
                  icon={<Package size={18} />} 
                  label={`Мои объявления (${products.length})`} 
                />
                <TabButton 
                  isActive={activeTab === "purchases"} 
                  onClick={() => setActiveTab("purchases")} 
                  icon={<ShoppingBag size={18} />} 
                  label="Мои покупки" 
                />
                <div className="my-2 border-t border-slate-100"></div>
                <TabButton 
                  isActive={activeTab === "create-ad"} 
                  onClick={() => setActiveTab("create-ad")} 
                  icon={<PlusCircle size={18} />} 
                  label="Подать объявление" 
                  isAction 
                />
              </nav>
            </div>
          </aside>

          <main className="md:col-span-8">
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm min-h-[500px]">
              
              {activeTab === "my-ads" && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                    Ваши активные товары
                  </h2>
                  {products.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 font-medium">У вас пока нет объявлений</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {products.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          {...product}
                          description={product.description ?? ""}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {activeTab === "purchases" && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">История покупок</h2>
                  <div className="text-center py-20 text-slate-400 font-medium">Вы еще ничего не заказывали</div>
                </section>
              )}

              {activeTab === "create-ad" && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Выставить товар</h2>
                  <AddProductForm sellerId={user.id} />
                </section>
              )}

            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

const TabButton = ({ isActive, onClick, icon, label, isAction }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-5 py-4 rounded-2xl font-bold transition-all text-sm
      ${isActive && !isAction ? "bg-slate-100 text-black" : "text-slate-500 hover:bg-slate-50 hover:text-black"}
      ${isAction && isActive ? "bg-black text-white" : ""}
      ${isAction && !isActive ? "bg-slate-900 text-white hover:bg-black shadow-md" : ""}
    `}
  >
    {icon}
    {label}
  </button>
);