"use server";

import prisma from "@/lib/prisma";

export async function searchProducts(q: string) {
  if (!q || q.length < 2) return [];
  
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 8,
    });
    
    return products;
  } catch (error) {
     console.error("❌ Ошибка при поиске товаров в БД:", error);
    return []; 
  }
}