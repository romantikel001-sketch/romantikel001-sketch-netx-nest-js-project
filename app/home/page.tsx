"use client";

import Header from "@/components/home/layout/header/Header";
import { ProductCard } from "@/components/ui/ProductCard";

const MOCK_PRODUCTS = [
  { id: "1", name: "Клавиатура", price: 45000, image: null },
];

export default function HomePage() {
  const handleAddToCart = (id: string) => {
    console.log("Товар добавлен:", id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Добро пожаловать</h1>
        <p className="text-slate-600 mb-8 max-w-2xl">техника</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}