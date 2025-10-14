import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NominalsFulfilledChart } from './components/NominalsFulfilledChart';
import { useTranslations } from 'next-intl';

const stats = [
    { titleKey: 'totalRentPaid', value: '905,585 SH', color: 'text-sky-500' },
    { titleKey: 'totalNominalsCreated', value: '116', color: 'text-sky-500' },
    { titleKey: 'totalNominalsFulfilled', value: '08', color: 'text-green-500' },
    { titleKey: 'avgTimeToFulfill', value: '20 DAYS', color: 'text-sky-500' },
]

export default function DashboardPage() {
    const t = useTranslations('Dashboard');

    return (
        <div className="container py-8 bg-gray-50/50 min-h-full">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
            </div>

            <Card className="mb-8">
                <CardContent className="p-4">
                     <div className="w-1/4">
                        <label className="text-sm font-medium" htmlFor="filter">{t('filterBy')}</label>
                        <Select>
                            <SelectTrigger id="filter" className="mt-1">
                                <SelectValue placeholder={t('chooseOption')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">{t('daily')}</SelectItem>
                                <SelectItem value="weekly">{t('weekly')}</SelectItem>
                                <SelectItem value="monthly">{t('monthly')}</SelectItem>
                                <SelectItem value="yearly">{t('yearly')}</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                </CardContent>
            </Card>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.titleKey}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t(`stats.${stat.titleKey}`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <NominalsFulfilledChart />
        </div>
    );
}
