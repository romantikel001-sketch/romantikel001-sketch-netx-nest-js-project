"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity: number) {
  const userId = "test-user-id"; 

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
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId,
          userId,
          quantity: quantity,
        },
      });
    }
    revalidatePath("/home");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false };
  }
}