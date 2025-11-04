// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface UserInfo {
  name: string;
  roles: string[];
}

interface AuthContextType {
  status: AuthStatus;
  user: UserInfo | null;
  refreshAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("unknown");
  const [user, setUser] = useState<UserInfo | null>(null);

  const refreshAuth = async () => {
    try {
      const res = await fetch(window.runtimeConfig?.API_BASE_URL + "/api/Login/CurrentUser", {
        credentials: "include"
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data);
      setStatus("authenticated");
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  const login = async (username: string, password: string) => {
    const res = await fetch(window.runtimeConfig?.API_BASE_URL + "/api/Login/Login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    var pOut = null;
    if (res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else 
      pOut = await res.json();

    await refreshAuth();
    return pOut;
  };

  const logout = async () => {
    await fetch(window.runtimeConfig?.API_BASE_URL + "/api/Login/Logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ status, user, refreshAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthContextProvider");
  return ctx;
}
