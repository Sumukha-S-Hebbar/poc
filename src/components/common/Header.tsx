'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/consultants', label: 'Consultants' },
];

export function Header() {
  const pathname = usePathname();

  const NavItems = () =>
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'transition-colors hover:text-foreground/80 text-foreground/60',
          (pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))) && 'text-foreground'
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SiteLink Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavItems />
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
               <Menu className="h-5 w-5" />
               <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
             <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Logo className="h-6 w-6" />
                <span className="font-bold">SiteLink Pro</span>
             </Link>
            <nav className="flex flex-col space-y-4 text-lg font-medium">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>


        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
