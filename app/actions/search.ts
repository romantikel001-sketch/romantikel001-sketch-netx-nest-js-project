"use server";

import prisma from "@/lib/prisma";

export async function searchProducts(q: string) {
  if (!q || q.length < 2) return [];
  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 8,
  });
}