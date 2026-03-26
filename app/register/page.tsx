"use client";

import Link from "next/link";
import { useRegister } from "./register";

export default function RegisterPage() {
  const { 
    email, setEmail, 
    password, setPassword, 
    confirmPassword, setConfirmPassword, 
    loading, 
    handleRegister 
  } = useRegister();

 return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-6">Создать аккаунт</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          <input 
            type="password" 
            placeholder="Повторите пароль" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition" 
            required 
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-semibold hover:underline underline-offset-4">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}