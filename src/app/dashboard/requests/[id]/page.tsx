import { notFound } from 'next/navigation';
import Image from 'next/image';
import { agents, siteRequests } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Calendar, FileText, MapPin, User } from 'lucide-react';
import { RecommendationEngine } from './components/RecommendationEngine';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
    return siteRequests.map((request) => ({
      id: request.id,
    }));
}

export default function SiteRequestDetailsPage({ params }: { params: { id: string } }) {
  const request = siteRequests.find((r) => r.id === params.id);
  if (!request) {
    notFound();
  }

  const agent = agents.find((a) => a.id === request.assignedAgentId);
  const agentAvatar = PlaceHolderImages.find((img) => img.id === agent?.avatarId);
  const mapImage = PlaceHolderImages.find((img) => img.id === 'site-map');

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Request Details</h1>
        <p className="text-muted-foreground">ID: {request.id}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl flex items-center">
                            <MapPin className="mr-3 h-6 w-6 text-primary" />
                            {request.location}
                        </CardTitle>
                        <Badge
                            variant={request.status === 'Open' ? 'secondary' : request.status === 'Closed' ? 'outline' : 'default'}
                            className="text-sm"
                        >
                            {request.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mapImage && (
                        <div className="aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                            src={mapImage.imageUrl}
                            alt={`Map of ${request.location}`}
                            width={800}
                            height={600}
                            className="object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                        </div>
                    )}
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <Building className="mr-3 h-4 w-4 text-muted-foreground" />
                            <strong>Towerco:</strong><span className="ml-2">{request.towerco}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                            <strong>Date Created:</strong><span className="ml-2">{request.dateCreated}</span>
                        </div>
                    </div>
                    {agent && (
                        <div className="flex items-center rounded-md border p-4 bg-accent/20">
                            <User className="mr-4 h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                                <strong className="block">Assigned Agent</strong>
                                <div className="flex items-center mt-1">
                                    <Avatar className="h-8 w-8 mr-2">
                                        {agentAvatar && <AvatarImage src={agentAvatar.imageUrl} alt={agent.name} data-ai-hint={agentAvatar.imageHint}/>}
                                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-foreground">{agent.name}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold flex items-center mb-2">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            Specifications
                        </h3>
                        <p className="text-muted-foreground bg-slate-50 p-4 rounded-md border">{request.specifications}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <RecommendationEngine request={request} />
        </div>
      </div>
    </div>
  );
}
