import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Briefcase, MapPin, Search, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Tower Site Requests',
    description: 'Towercos can easily create and manage site requests with specific location details and technical specifications.',
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Agent Assignment',
    description: 'Assign requests to trusted real estate agents to find the perfect site for your next tower.',
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: 'AI Site Recommendations',
    description: 'Agents can leverage our AI to discover and recommend suitable sites near requested locations.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Consultant Directory',
    description: 'Access a curated list of permit and legal consultants to streamline your project execution.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
            SiteLink Pro
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-neutral-200">
            Streamlining site acquisition for Towercos, MNOs, and Real Estate Agents. Your direct link to prime tower locations.
          </p>
          <Button asChild size="lg" className="mt-8 group">
            <Link href="/dashboard">
              Explore Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Accelerate Your Network Expansion</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SiteLink Pro provides an integrated platform to manage the entire lifecycle of site acquisition, from initial request to final handshake.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-accent mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="bg-muted py-6">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} SiteLink Pro. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
