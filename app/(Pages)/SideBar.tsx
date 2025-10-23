import { NavLink, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <>
            <NavLink
                label="Config"
                href="/config"
                active={pathname.startsWith('/config')}
                component={Link}
                variant="light" />

            <NavLink
                label="Add Adjustment From Sales Return"
                href="/addadjustmentfromaalesreturn"
                active={pathname.startsWith('/addadjustmentfromaalesreturn')}
                component={Link}
                variant="light" />

            <NavLink
                label="Resolve Sales Return"
                href="/resolvesalesreturn"
                active={pathname.startsWith('/resolvesalesreturn')}
                component={Link}
                variant="light" />

            <NavLink
                label="Third Party Sales"
                href="/thirdpartysales"
                active={pathname.startsWith('/thirdpartysales')}
                component={Link}
                variant="light" />

            <NavLink
                label="Accounts"
                href="/accounts"
                active={pathname.startsWith('/accounts')}
                component={Link}
                variant="light" />

            <NavLink
                label="Old Data Deleter"
                href="/olddatadeleter"
                active={pathname.startsWith('/olddatadeleter')}
                component={Link}
                variant="light" />

            <NavLink
                label="SQL Partition"
                href="/sqlpartition"
                active={pathname.startsWith('/sqlpartition')}
                component={Link}
                variant="light" />
        </>
    );
}