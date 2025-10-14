import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RealEstateAgent, SiteRequest } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, MapPin, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SiteRequestCardProps {
  request: SiteRequest;
  agent?: RealEstateAgent;
}

export function SiteRequestCard({ request, agent }: SiteRequestCardProps) {
  const agentAvatar = PlaceHolderImages.find((img) => img.id === agent?.avatarId);

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{request.location}</CardTitle>
          <Badge
            variant={
              request.status === 'Open'
                ? 'secondary'
                : request.status === 'Closed'
                ? 'outline'
                : 'default'
            }
            className={cn(
              request.status === 'In Progress' && 'bg-accent text-accent-foreground'
            )}
          >
            {request.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center pt-1">
          <Building className="mr-2 h-4 w-4" /> {request.towerco}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-4">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>ID: {request.id}</span>
          </div>
          {agent ? (
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Assigned to:</span>
              <div className="flex items-center ml-2">
                <Avatar className="h-6 w-6 mr-2">
                    {agentAvatar && <AvatarImage src={agentAvatar.imageUrl} alt={agent.name} data-ai-hint={agentAvatar.imageHint}/>}
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{agent.name}</span>
              </div>
            </div>
          ) : (
             <div className="flex items-center text-amber-600">
                <User className="mr-2 h-4 w-4" />
                <span>Unassigned</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full group">
          <Link href={`/dashboard/requests/${request.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
