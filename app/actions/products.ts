"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/uploadFile";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const sellerId = formData.get("sellerId") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !price || !sellerId) return { error: "Заполни все поля" };

  const imageUrl = await uploadFile(imageFile, "prod");

  await prisma.product.create({
    data: {
      name,
      price,
      sellerId,
      description,
      image: imageUrl || "/products/placeholder.jpg",
    },
  });

  revalidatePath("/");
  revalidatePath("/profile");
}