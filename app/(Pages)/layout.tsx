'use client';

import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Provider } from 'react-redux';
import store, { loadState } from '@/app/store';
import { useEffect } from 'react';
import { NavbarNested } from '../sidebar/NavBarNested';
import { AuthContextProvider } from "@/app/contexts/AuthContext";

export default function RootLayout({ children }: { children: any }) {
    useEffect(() => {
        loadState(store);
    }, []);

    return (
        <Provider store={store}>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </Provider>
    );
}