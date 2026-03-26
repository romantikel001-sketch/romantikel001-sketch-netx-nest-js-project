import { useCart } from "@/app/store/useCart";

export function useCartLogic() {
  const { items, removeItem } = useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    removeItem,
    total,
    totalQuantity,
  };
}