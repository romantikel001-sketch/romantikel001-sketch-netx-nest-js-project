import Header from "@/components/home/layout/header/Header";
import { ProductCard } from "@/components/ui/ProductCard";

const MOCK_PRODUCTS = [
  { id: "1", name: "клавиатура", description: "хорошая прям керемет", price: 45000, image: "/products/1.jpg" },
];

export default function HomePage() {  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">техника</h1>
          <p className="text-slate-500">техника крутая</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </main>
    </div>
  );
}