// components/NavigationObserver.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from "react";
import { notifications } from "@mantine/notifications";

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
        const startProgress = () => showToast('Loading...');
        const stopProgress = () => hideToast();

        // 1. Handle Clicks on <a> and <Link> tags
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            const href = target.closest('a')?.href;

            // Only trigger for internal links
            if (href && href.startsWith(window.location.origin) && href !== window.location.href) {
                startProgress();
            }
        };

        // 2. Handle Browser Back/Forward buttons
        const handlePopState = () => {
            startProgress();
        };

        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('popstate', handlePopState);

        // 3. Stop progress when the route actually changes (Navigation Complete)
        stopProgress();

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('popstate', handlePopState);
        };

    }, [pathname, searchParams]);

    return null;
}
