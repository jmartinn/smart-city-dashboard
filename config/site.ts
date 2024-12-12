import { MainNavItem } from 'types/nav';

export const siteConfig = {
  name: 'Smart City Energy Dashboard',
  url: 'https://technical-test-jmartinns-projects.vercel.app/',
  description:
    'A comprehensive dashboard for monitoring and analyzing energy consumption, production, and emissions in smart cities. Empowering sustainable urban development through data-driven insights.',
  links: {
    github: 'https://github.com/jmartinn/technical-test',
  },
};

export type SiteConfig = typeof siteConfig;

export interface NavConfig {
  mainNav: MainNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Customers',
      href: '#',
      disabled: true,
    },
    {
      title: 'Products',
      href: '#',
      disabled: true,
    },
    {
      title: 'Invoices',
      href: '#',
      disabled: true,
    },
    {
      title: 'Settings',
      href: '/settings',
    },
  ],
};
