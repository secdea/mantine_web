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

  function delayedNavitageToHome() {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }

  return (
    <>
      <div>This is a protected page</div>
      <Button onClick={doLogout}>Logout</Button>
      <Link href="/login">Go to login page</Link>
      <Button component={Link} href="/login">Go to login page</Button>
      <Button component={Link} href="/">Go to home page</Button>
      <Button onClick={delayedNavitageToHome}>React navigate to home  page</Button>
      <a href ="/">Go to home page with anchor</a>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
