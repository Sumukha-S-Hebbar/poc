'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Globe, LogOut, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navLinks = [
    { href: '/dashboard', labelKey: 'dashboard' },
    { href: '/create-nominal', labelKey: 'createNominal' },
    { href: '/nominals-list', labelKey: 'nominalsList' },
    { href: '/search-candidate', labelKey: 'searchCandidate' },
    { href: '/overview', labelKey: 'overview' },
    { href: '/reports', labelKey: 'reports' },
    { href: '/account', labelKey: 'account' },
  ];
  
  const onSelectChange = (value: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${value}`);
    startTransition(() => {
      router.replace(newPath);
    });
  };

  const NavItems = () =>
    navLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'transition-colors hover:text-primary-foreground/80',
          pathname.endsWith(link.href) ? 'text-primary-foreground' : 'text-primary-foreground/60'
        )}
      >
        {t(link.labelKey)}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-red-600 text-primary-foreground">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              SiteLink Pro
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavItems />
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden text-primary-foreground hover:bg-red-700 hover:text-primary-foreground"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t('toggleMenu')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Logo className="h-6 w-6" />
              <span className="font-bold">SiteLink Pro</span>
            </Link>
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Select onValueChange={onSelectChange} defaultValue={locale} disabled={isPending}>
            <SelectTrigger className="w-auto text-primary-foreground bg-red-700/50 border-red-500">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('english')}</SelectItem>
              <SelectItem value="es">{t('spanish')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
