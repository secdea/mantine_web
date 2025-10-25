// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthContextType {
  status: AuthStatus;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("unknown");

  const refreshAuth = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/Login/CurrentUser", {
        credentials: "include"
      });

      setStatus(res.ok ? "authenticated" : "unauthenticated");
    } catch {
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    // auto verify on boot
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ status, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthContextProvider");
  return ctx;
}
