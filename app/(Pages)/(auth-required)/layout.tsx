// app/(auth-required)/layout.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "unknown") {
    return <div className="progress">Checking authentication...</div>;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
}
