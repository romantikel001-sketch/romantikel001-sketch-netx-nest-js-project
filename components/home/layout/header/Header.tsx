import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        <div className="hidden sm:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}