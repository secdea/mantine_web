// components/NavigationObserver.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from "react";
import { notifications } from "@mantine/notifications";
import { start } from 'repl';

export default function NavigationObserver() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toastTimer = useRef<NodeJS.Timeout | null>(null);
    const isNavigating = useRef(false);
    const toastVisible = useRef(false);

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
        console.log(`Loading ${url}...`);
    };

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

    useEffect(() => {
        // 1. Define how to start and stop
        const startProgress = () => 
            showToast('Loading...');

        // 2. Patch the browser's "push" function (Run ONCE on mount)
        const originalPush = window.history.pushState;
        window.history.pushState = function (...args) {
            startProgress(); // Start toast when code calls router.push
            return originalPush.apply(window.history, args);
        };

        // 3. Listen for back/forward buttons
        window.addEventListener('popstate', startProgress);

        // CLEANUP: If the component ever dies, put the browser back to normal
        return () => {
            window.history.pushState = originalPush;
            window.removeEventListener('popstate', startProgress);
        };
    }, []); // Empty array = run once on startup

    // 4. SECOND EFFECT: This one watches for the URL change to STOP the toast
    useEffect(() => {
        hideToast(); // Stop toast when URL changes (navigation finished)
    }, [pathname, searchParams]); // Runs every time the page actually changes
}
