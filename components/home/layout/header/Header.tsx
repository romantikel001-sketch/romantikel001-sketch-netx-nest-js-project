import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import prisma from "@/lib/prisma";
import { ShoppingCart, User as UserIcon, Wallet } from "lucide-react"; 

export default async function Header() {
  const userId = "test-user-id"; 
  const isLoggedIn = !!userId;

  let cartCount = 0;
  let user = null;

  try {
    if (userId) {
      const [count, userData] = await Promise.all([
        prisma.cartItem.count({ where: { userId } }),
        prisma.user.findUnique({ where: { id: userId } })
      ]);
      cartCount = count;
      user = userData;
    }
  } catch (error) {
    console.error("Ошибка Prisma в Header:", error);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-6">
      
        <div className="flex items-center justify-end gap-3 sm:gap-5 flex-1">
          
          <div className="hidden md:block w-full max-w-xs">
            <SearchBar />
          </div>

          <div className="h-8 w-px bg-slate-200/80 hidden md:block"></div> 

          <Link 
            href="/home/cart" 
            className="relative p-2.5 bg-slate-100/50 hover:bg-slate-200/80 rounded-xl text-slate-700 hover:text-slate-900 transition-all border border-slate-200/50 group"
          >
            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md shadow-slate-900/30">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 bg-green-50/60 px-3 py-1.5 rounded-xl border border-green-100/50">
                <Wallet size={16} className="text-green-600" />
                <p className="text-sm font-bold text-green-700">{user?.balance || 0} ₸</p>
              </div>

              <Link 
                href="/home/profile" 
                className="flex items-center gap-2 p-1 pr-4 bg-slate-100/50 hover:bg-slate-200/80 rounded-full border border-slate-200/50 transition-all group"
              >
                {user?.image ? (
                  <img src={user.image} alt="Avatar" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                ) : (
                  <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-sm shadow-slate-900/30">
                    <UserIcon size={18} />
                  </div>
                )}
                <span className="text-sm font-bold text-slate-700 hidden sm:block group-hover:text-slate-900 transition-colors">
                  Профиль
                </span>
              </Link>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-slate-900/20 active:scale-95"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}