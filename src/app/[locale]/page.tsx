
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-4 bg-background">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/dashboard">{t('exploreDashboard')}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-20 w-full max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight">{t('keyFeatures')}</h2>
        <p className="mt-2 text-muted-foreground">{t('featuresSubtitle')}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">{t('feature1Title')}</h3>
            <p className="mt-2 text-muted-foreground">{t('feature1Desc')}</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">{t('feature2Title')}</h3>
            <p className="mt-2 text-muted-foreground">{t('feature2Desc')}</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">{t('feature3Title')}</h3>
            <p className="mt-2 text-muted-foreground">{t('feature3Desc')}</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold">{t('feature4Title')}</h3>
            <p className="mt-2 text-muted-foreground">{t('feature4Desc')}</p>
          </div>
        </div>
      </div>
       <footer className="mt-24 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </footer>
    </div>
  );
}
