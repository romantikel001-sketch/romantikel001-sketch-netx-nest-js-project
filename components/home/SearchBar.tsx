"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { searchProducts } from "@/app/actions/search";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IProduct } from "@/app/types/product";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      const params = new URLSearchParams();
      
      if (q.length >= 2) {
        params.set("q", q);
        const data = await searchProducts(q);
        setResults(data as IProduct[]);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      
      const currentUrl = window.location.pathname + window.location.search;
      if (newUrl !== currentUrl) {
        window.history.replaceState(null, "", newUrl);
      }
      
    }, 300);

    return () => clearTimeout(delay);
  }, [q, pathname]);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 transition-all focus-within:bg-white focus-within:border-slate-900 focus-within:shadow-xl">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Поиск..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => q.length >= 2 && setIsOpen(true)}
          className="w-full py-3 px-4 bg-transparent outline-none font-bold text-slate-900 text-sm"
        />
        {q && <X size={18} className="text-slate-400 cursor-pointer" onClick={() => setQ("")} />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 shadow-2xl rounded-[28px] overflow-hidden z-[100]">
            <div className="p-2">
              {results.length > 0 ? (
                results.map((p) => (
                  <Link key={p.id} href={`/home/product/${p.id}`} onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-2.5 hover:bg-slate-50 rounded-2xl group transition-all">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                      {p.image && <img src={p.image} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 truncate">{p.name}</p>
                      <p className="text-xs font-black text-slate-500">{p.price.toLocaleString()} ₸</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-all mr-2" />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center font-black text-slate-300 text-[10px] uppercase tracking-widest">Ничего не найдено</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="w-full h-12 bg-slate-100 animate-pulse rounded-2xl" />}>
      <SearchInput />
    </Suspense>
  );
}