'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'hidden items-center space-x-4 md:flex lg:space-x-6',
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        Home
      </Link>
      <Link
        href="#"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/customers'
            ? 'text-foreground'
            : 'text-muted-foreground'
        )}
      >
        Customers
      </Link>
      <Link
        href="#"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/customers'
            ? 'text-foreground'
            : 'text-muted-foreground'
        )}
      >
        Products
      </Link>
      <Link
        href="#"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/products' ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        Invoices
      </Link>
      <Link
        href="/settings"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname.startsWith('/settings')
            ? 'text-foreground'
            : 'text-muted-foreground'
        )}
      >
        Settings
      </Link>
    </nav>
  );
}
