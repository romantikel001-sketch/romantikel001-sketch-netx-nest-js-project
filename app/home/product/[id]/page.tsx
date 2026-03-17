import prisma from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{ id: string }>; 
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen font-black uppercase text-slate-400">
        Товар не найден
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-10">
       <h1 className="text-4xl font-black">{product.name}</h1>
    </div>
  )
}