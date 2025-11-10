import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup';
import { UserButton } from './UserButton';
import { Logo } from './Logo';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Home', link: '/' },
      { label: 'Dashboard', link: '/dashboard' },
      { label: 'Login', link: '/login' },
      { label: 'Mantine React Table example 2', link: '/mrt2' },
      { label: 'Mantine React Table example 3', link: '/mrt3' },
      { label: 'Mantine React Table - defective', link: '/mrt' },
      { label: 'Gilde Data Grid', link: '/glidetry' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: 120 }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}