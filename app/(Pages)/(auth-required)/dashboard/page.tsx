"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { Button } from "@mantine/core";
import Link from "next/link";
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
      <Link href="/login">Go to login page</Link>
      <Button component={Link} href="/login">Go to login page</Button>
      <Button component={Link} href="/">Go to home page</Button>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
