'use client';

import * as React from 'react';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link, { LinkProps } from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HamburgerMenuIcon className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar">
        <SheetHeader className="text-left">
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2">
            {navConfig.mainNav.map(
              (item, _i) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={!item.disabled ? item.href : '#'}
                    onOpenChange={setOpen}
                    className={cn('transition-colors')}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn('rounded-md px-3 py-1 hover:bg-accent', className)}
      {...props}
    >
      <div className="px-1 text-sm text-sidebar-foreground">{children}</div>
    </Link>
  );
}
