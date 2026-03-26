"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function useRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    await authClient.signUp.email({
      email,
      password,
      name: email.split('@')[0],
    }, {
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onSuccess: () => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  return {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    loading,
    handleRegister
  };
}