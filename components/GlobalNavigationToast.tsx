"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { notifications } from "@mantine/notifications";

export function GlobalNavigationToast() {
  const router = useRouter();
  const pathname = usePathname();

  const lastPath = useRef(pathname);
  const isNavigating = useRef(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);
  const toastVisible = useRef(false);

  useEffect(() => {
    const origPush = router.push;
    const origReplace = router.replace;

    const showToast = (url: string) => {
      // cancel any pending toast timers
      if (toastTimer.current) clearTimeout(toastTimer.current);

      isNavigating.current = true;

      // Delay before showing (avoid flicker for instant routes)
      toastTimer.current = setTimeout(() => {
        if (!isNavigating.current) return; // navigation finished before delay
        toastVisible.current = true;
        notifications.show({
          id: "nav-loading",
          loading: true,
          title: "Navigating",
          message: `Loading ${url}...`,
          autoClose: false,
          withCloseButton: false,
        });
      }, 150);
      console.log( `Loading ${url}...`);
    };

    // Patch router methods
    router.push = (...args: any) => {
      const [url] = args;
      showToast(url);
      return origPush.apply(router, args);
    };

    router.replace = (...args: any) => {
      const [url] = args;
      showToast(url);
      return origReplace.apply(router, args);
    };

    return () => {
      router.push = origPush;
      router.replace = origReplace;
    };
  }, [router]);

  const hideToast = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    if (!toastVisible.current) {
      // never displayed → nothing to hide
      isNavigating.current = false;
      return;
    }

    toastVisible.current = false;
    isNavigating.current = false;

    notifications.hide("nav-loading");
    // notifications.update({
    //   id: "nav-loading",
    //   loading: false,
    //   title: "Navigation complete",
    //   message: "Page loaded successfully.",
    //   autoClose: 1000,
    //   withCloseButton: true,
    // });
  };

  // Detect when the route actually changed (render complete)
  useEffect(() => {
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;
      // Give React time to hydrate / suspense to settle
      setTimeout(() => {
        if (isNavigating.current) hideToast();
      }, 300);
    }
  }, [pathname]);

  return null;
}
