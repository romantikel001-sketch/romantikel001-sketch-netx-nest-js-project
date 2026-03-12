import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import prisma from "@/lib/prisma";
import { ShoppingCart } from "lucide-react"; 

export default async function Header() {
  const userId = "test-user-id"; 
  let cartCount = 0;
  try {
    cartCount = await prisma.cartItem.count({
      where: { userId }
    });
  } catch (error) {
    console.error("Ошибка Prisma в Header:", error);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <Link href="/home" className="font-bold text-xl tracking-tighter italic">
        </Link>

        <div className="hidden sm:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/home/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}