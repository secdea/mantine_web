// app/(auth-required)/layout.tsx
"use client";

import { AuthContextProvider, useAuth } from "@/app/contexts/AuthContext";
import { NavbarNested } from "@/app/sidebar/NavBarNested";
import { AppShell } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import 'mantine-react-table/styles.css'; //import MRT styles

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
    return <AppShell
        // header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: false, desktop: false },
        }}
        padding="md"
      >
        <AppShell.Navbar >
          <NavbarNested />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>;
  }

  return null;
}
