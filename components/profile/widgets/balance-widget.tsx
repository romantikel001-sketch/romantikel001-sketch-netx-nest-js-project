export default function BalanceWidget({ amount }: { amount: number }) {
  return (
    <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Баланс</p>
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-bold text-white">{amount.toLocaleString()} ₸</h2>
        <button className="text-xs bg-white text-black px-3 py-1.5 rounded-lg font-bold hover:bg-zinc-200 transition">
          ВЫВОД
        </button>
      </div>
    </div>
  );
}