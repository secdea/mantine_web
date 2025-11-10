"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useNavigationEvents() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const navigatingRef = useRef(false);

  const push = (href: string) => {
    navigatingRef.current = true;
    setLoading(true);
    router.push(href);
  };

  const replace = (href: string) => {
    navigatingRef.current = true;
    setLoading(true);
    router.replace(href);
  };

  // detect completion when pathname changes
  useEffect(() => {
    if (navigatingRef.current) {
      navigatingRef.current = false;
      setLoading(false);
    }
  }, [pathname]);

  return { push, replace, loading };
}
