import { agents, siteRequests } from '@/lib/data';
import { SiteRequestCard } from './components/SiteRequestCard';
import { CreateRequestDialog } from './components/CreateRequestDialog';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Site Requests Dashboard</h1>
            <p className="text-muted-foreground">Manage and track all tower site requests.</p>
        </div>
        <CreateRequestDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {siteRequests.map((request) => {
          const agent = agents.find((a) => a.id === request.assignedAgentId);
          return <SiteRequestCard key={request.id} request={request} agent={agent} />;
        })}
      </div>
    </div>
  );
}
