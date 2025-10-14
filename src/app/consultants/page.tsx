import Image from 'next/image';
import { consultants } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, FileText, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ConsultantsPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Consultant Directory</h1>
        <p className="text-muted-foreground mt-2">Find legal and permit experts for your projects.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {consultants.map((consultant) => {
          const avatar = PlaceHolderImages.find((img) => img.id === consultant.avatarId);
          return (
            <Card key={consultant.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={consultant.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback className="text-3xl">{consultant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{consultant.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {consultant.type === 'Legal' ? <FileText className="mr-2 h-4 w-4" /> : <Briefcase className="mr-2 h-4 w-4" />}
                  {consultant.type} Consultant
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <p className="text-center font-medium text-primary">{consultant.specialty}</p>
                <div className="flex items-center">
                  <Mail className="mr-3 h-4 w-4" />
                  <a href={`mailto:${consultant.email}`} className="hover:text-primary transition-colors">
                    {consultant.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 h-4 w-4" />
                  <span>{consultant.phone}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
