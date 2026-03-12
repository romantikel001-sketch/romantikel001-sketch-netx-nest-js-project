import Header from "@/components/home/layout/header/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Добро пожаловать</h1>
        <p className="text-slate-600 mb-8 max-w-2xl">продажа техники</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        </div>
      </main>
    </div>
  );
}