"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, userId: string) {
  try {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        userId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId,
          userId,
          quantity: 1,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/home");
    
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add to cart");
  }
}