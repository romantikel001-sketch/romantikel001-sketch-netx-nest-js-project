"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onSuccess: () => {
        window.location.href = "/home";
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-200">
        {message === "success" && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center border border-green-200">
            Регистрация успешна! Теперь войдите.
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-6">Вход в систему</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Впервые у нас?{" "}
            <Link href="/register" className="font-semibold hover:underline underline-offset-4">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}