import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import prisma from "@/lib/prisma";
import { ShoppingCart, User as UserIcon, Wallet, Home } from "lucide-react"; 

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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
      
        <div className="flex items-center">
          <Link href="/home" className="text-slate-900 hover:text-black transition-all p-2 hover:bg-slate-100 rounded-xl">
            <Home size={24} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                <Wallet size={16} className="text-slate-900" />
                <p className="text-sm font-black text-slate-900">{user?.balance || 0} ₸</p>
              </div>
              <Link 
                href="/home/cart" 
                className="relative p-2.5 text-slate-600 hover:text-slate-950 transition-all group"
              >
                <ShoppingCart size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-slate-900 text-white text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/home/profile" 
                className="flex items-center gap-2 p-1 pr-3 bg-slate-900 hover:bg-black rounded-full transition-all group shadow-md shadow-slate-200"
              >
                {user?.image ? (
                  <img src={user.image} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                ) : (
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white">
                    <UserIcon size={16} strokeWidth={3} />
                  </div>
                )}
                <span className="text-xs font-black uppercase tracking-wider text-white hidden md:block">
                  Профиль
                </span>
              </Link>
            </>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}