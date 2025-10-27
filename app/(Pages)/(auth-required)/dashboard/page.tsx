"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { logout } = useAuth();
  const router = useRouter();

  const doLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <div>This is a protected page</div>
      <Button onClick={doLogout}>Logout</Button>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
