import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Pharmacy } from '../data/pharmacies';
import { formatDistance } from '../utils/haversine';

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  distance: number;
  rank: number;
}

export function PharmacyCard({ pharmacy, distance, rank }: PharmacyCardProps) {
  const isNearest = rank === 1;

  return (
    <Card className={`card-hover border shadow-card ${
      isNearest ? 'border-primary/50 ring-2 ring-primary/15' : 'border-border'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Rank badge */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
            isNearest
              ? 'gradient-hero text-white shadow-sm'
              : 'bg-secondary text-secondary-foreground'
          }`}>
            {rank}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {pharmacy.name}
              </h3>
              {isNearest && (
                <Badge className="text-xs flex-shrink-0 bg-primary text-primary-foreground">
                  Nearest
                </Badge>
              )}
            </div>

            <div className="space-y-1.5 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                <span className="truncate">{pharmacy.address}</span>
              </div>

              {pharmacy.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                  <span>{pharmacy.phone}</span>
                </div>
              )}

              {pharmacy.hours && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                  <span className="truncate">{pharmacy.hours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Distance */}
          <div className="flex-shrink-0 text-right">
            <div className="flex items-center gap-1 text-primary">
              <Navigation className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{formatDistance(distance)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">away</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
