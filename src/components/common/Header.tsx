'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Globe, LogOut, Menu } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const navLinks = [
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/create-nominal', label: 'CREATE NOMINAL' },
  { href: '/nominals-list', label: 'NOMINALS LIST' },
  { href: '/search-candidate', label: 'SEARCH CANDIDATE' },
  { href: '/overview', label: 'OVERVIEW' },
  { href: '/reports', label: 'REPORTS' },
  { href: '/account', label: 'ACCOUNT' },
];

export function Header() {
  const pathname = usePathname();

  const NavItems = () =>
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'transition-colors hover:text-white px-3 py-2 rounded-md text-sm font-medium',
          (pathname === link.href) 
            ? 'bg-white text-blue-600' 
            : 'text-blue-100 hover:bg-blue-700'
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 bg-white p-3 rounded-md">
            <Logo className="h-8 w-8" />
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            <NavItems />
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden text-white hover:text-white">
               <Menu className="h-6 w-6" />
               <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-blue-600 text-white border-r-0">
             <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-white p-2 rounded-md">
                    <Logo className="h-8 w-8" />
                </div>
             </Link>
            <nav className="flex flex-col space-y-2 text-base font-medium">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>


        <div className="flex flex-1 items-center justify-end space-x-4">
            <Select>
                <SelectTrigger className="w-auto bg-blue-600 border-blue-500 text-white focus:ring-0">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="ENGLISH" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">ENGLISH</SelectItem>
                    <SelectItem value="es">SPANISH</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="ghost" className="text-white hover:bg-blue-700 hover:text-white">
                <LogOut className="mr-2 h-4 w-4"/>
                LOGOUT
            </Button>
        </div>
      </div>
    </header>
  );
}
