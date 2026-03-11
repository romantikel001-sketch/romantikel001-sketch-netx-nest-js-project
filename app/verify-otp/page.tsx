"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.emailOtp.verifyEmail({ 
      email, 
      otp 
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  const handleResend = async () => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Новый код отправлен на вашу почту!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-2">Подтверждение</h2>
        <p className="text-sm text-slate-600 text-center mb-8">
          Введите 6-значный код, отправленный на <br />
          <span className="font-semibold text-slate-900">{email}</span>
        </p>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition text-center text-3xl tracking-[0.3em] font-bold bg-slate-50"
            required
            autoFocus
          />

          <button 
            type="submit" 
            disabled={loading || otp.length < 6}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Проверка..." : "Подтвердить почту"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Не получили код?{" "}
            <button 
              type="button"
              onClick={handleResend}
              className="font-semibold text-slate-900 hover:underline underline-offset-4"
            >
              Отправить еще раз
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}