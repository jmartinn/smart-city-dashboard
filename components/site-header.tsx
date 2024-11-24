import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';

import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-8">
        <MobileNav />
        <MainNav className="mx-6" />
        <div className="flex flex-1 items-center justify-end gap-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
