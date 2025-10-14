'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const formSchema = z.object({
  nominalId: z.string().min(1, 'Nominal ID is required'),
  nominalName: z.string().min(1, 'Nominal Name is required'),
  region: z.string().min(1, 'Region/Province is required'),
  city: z.string().min(1, 'City/Town is required'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

type FormData = z.infer<typeof formSchema>;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

export default function CreateNominalPage() {
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nominalId: '',
      nominalName: '',
      region: '',
      city: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const handleUseMyLocation = useCallback(() => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = { lat: latitude, lng: longitude };
          form.setValue('latitude', latitude, { shouldValidate: true });
          form.setValue('longitude', longitude, { shouldValidate: true });
          setCurrentPosition(newPos);
          toast({
            title: 'Location Found',
            description: 'Your current location has been filled in.',
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description: 'Could not retrieve your location. Please enter it manually.',
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Unsupported',
        description: 'Geolocation is not supported by your browser.',
      });
      setIsLocating(false);
    }
  }, [form, toast]);

  useEffect(() => {
    handleUseMyLocation();
  }, [handleUseMyLocation]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPos = { lat, lng };
      form.setValue('latitude', lat, { shouldValidate: true });
      form.setValue('longitude', lng, { shouldValidate: true });
      setCurrentPosition(newPos);
    }
  };

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPos = { lat, lng };
      form.setValue('latitude', lat, { shouldValidate: true });
      form.setValue('longitude', lng, { shouldValidate: true });
      setCurrentPosition(newPos);
    }
  };


  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: 'Nominal Created',
      description: `Successfully created nominal ${data.nominalName}.`,
    });
    form.reset();
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={libraries}
      loadingElement={<div className="container py-8"><Loader2 className="mx-auto h-10 w-10 animate-spin" /></div>}
    >
      <div className="container py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-4">CREATE NOMINAL</h1>
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg border relative">
              {currentPosition ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={currentPosition}
                  zoom={15}
                  onClick={onMapClick}
                >
                  <Marker position={currentPosition} draggable onDragEnd={onMarkerDragEnd} />
                </GoogleMap>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <Button onClick={handleUseMyLocation} variant="outline" disabled={isLocating}>
                {isLocating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="mr-2 h-4 w-4" />
                )}
                Use My Location
              </Button>
              <span>Or</span>
              <span>Click on the map to place a marker.</span>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="nominalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominal ID *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nominalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominal Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region/Province *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose An Option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="coast">Coast</SelectItem>
                        <SelectItem value="eastern">Eastern</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Town *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose An Option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nairobi-city">Nairobi City</SelectItem>
                        <SelectItem value="thika">Thika</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="meru">Meru</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" readOnly {...field} placeholder="Prefilled by map..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" readOnly {...field} placeholder="Prefilled by map..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Create Nominal</Button>
          </form>
        </Form>
      </div>
    </LoadScript>
  );
}
