import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NominalsFulfilledChart } from './components/NominalsFulfilledChart';

const stats = [
    { title: 'Total Rent Paid', value: '905,585 SH', color: 'text-sky-500' },
    { title: 'Total Nominals Created', value: '116', color: 'text-sky-500' },
    { title: 'Total Nominals Fulfilled', value: '08', color: 'text-green-500' },
    { title: 'Average Time To Fulfill A Nominal', value: '20 DAYS', color: 'text-sky-500' },
]

export default function DashboardPage() {
  return (
    <div className="container py-8 bg-gray-50/50 min-h-full">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold tracking-tight">DASHBOARD</h1>
            <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>

        <Card className="mb-8">
            <CardContent className="p-4">
                 <div className="w-1/4">
                    <label className="text-sm font-medium" htmlFor="filter">Filter By</label>
                    <Select>
                        <SelectTrigger id="filter" className="mt-1">
                            <SelectValue placeholder="Choose An Option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </CardContent>
        </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
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
