"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Ищем:", query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <input
        type="search"
        placeholder="Найти..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md py-3 pl-10 pr-5 bg-slate-300 border-transparent rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-slate-950 focus:border-transparent transition-all shadow-sm"      />
    </form>
  );
}