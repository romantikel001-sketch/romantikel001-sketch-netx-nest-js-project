import { ProductCard } from "@/components/ui/ProductCard";
import prisma from "@/lib/prisma"; 

export default async function HomePage() {  
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="max-w-[1400px] mx-auto px-4 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Техника</h1>
          <p className="text-slate-500">Актуальные предложения из базы</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description ?? ""}
                price={product.price}
                image={product.image ?? "/products/placeholder.jpg"} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}