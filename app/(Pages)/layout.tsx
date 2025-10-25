'use client';

import { Sidebar } from '@/app/(Pages)/SideBar';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Provider } from 'react-redux';
import store, { loadState } from '@/app/store';
import { useEffect } from 'react';
import { NavbarNested } from '../sidebar/NavBarNested';
import { AuthContextProvider } from "@/app/contexts/AuthContext";

export default function RootLayout({ children }: { children: any }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    useEffect(() => {
        loadState(store);
    }, []);

    return (
        <Provider store={store}>
            <AuthContextProvider>
                <AppShell
                    // header={{ height: 60 }}
                    navbar={{
                        width: 300,
                        breakpoint: 'sm',
                        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                    }}
                    padding="md"
                >
                    {/* <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    </Group>
                </AppShell.Header> */}
                    <AppShell.Navbar >
                        <NavbarNested />
                    </AppShell.Navbar>
                    <AppShell.Main>{children}</AppShell.Main>
                </AppShell>
            </AuthContextProvider>
        </Provider>
    );
}