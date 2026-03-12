import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function CartPage() {
  const userId = "test-user-id";
  
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
  async function deleteItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.cartItem.delete({ where: { id } });
    revalidatePath("/home/cart");
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>

      {items.length === 0 ? (
        <p>Пусто...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded relative overflow-hidden">
                  {item.product.image && <Image src={item.product.image} alt="" fill className="object-cover" />}
                </div>
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.price} ₸</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold">{item.product.price * item.quantity} ₸</span>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-red-500 text-sm hover:underline">
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}

          <div className="pt-4 text-xl font-bold flex justify-between">
            <span>Итого:</span>
            <span>{total} ₸</span>
          </div>
        </div>
      )}
    </div>
  );
}