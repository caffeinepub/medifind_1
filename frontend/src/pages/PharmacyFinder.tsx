import { useMemo } from 'react';
import { MapPin, Navigation, AlertCircle, Loader2, RefreshCw, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { PharmacyCard } from '../components/PharmacyCard';
import { useGeolocation } from '../hooks/useGeolocation';
import { SAMPLE_PHARMACIES } from '../data/pharmacies';
import { haversineDistance } from '../utils/haversine';

export function PharmacyFinder() {
  const { lat, lng, error, loading, hasLocation, requestLocation, reset } = useGeolocation();

  const sortedPharmacies = useMemo(() => {
    if (!hasLocation || lat === null || lng === null) return [];
    return SAMPLE_PHARMACIES
      .map((pharmacy) => ({
        pharmacy,
        distance: haversineDistance(
          { lat, lng },
          { lat: pharmacy.lat, lng: pharmacy.lng }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [hasLocation, lat, lng]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-card">
        <img
          src="/assets/generated/pharmacy-hero.dim_1200x400.png"
          alt="Pharmacy Finder"
          className="w-full h-48 sm:h-56 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Find Nearest Pharmacy</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-md">
            Locate the closest pharmacy to your current location
          </p>
        </div>
      </div>

      {/* Location Action Card */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              Your Location
            </h2>
            {hasLocation && lat !== null && lng !== null ? (
              <div className="mt-1 space-y-0.5">
                <p className="text-sm text-muted-foreground">
                  Coordinates: <span className="font-mono text-foreground text-xs">{lat.toFixed(4)}°N, {Math.abs(lng).toFixed(4)}°{lng < 0 ? 'W' : 'E'}</span>
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-medium">Location acquired</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Allow location access to find pharmacies near you
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {hasLocation && (
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </Button>
            )}
            <Button
              onClick={requestLocation}
              disabled={loading}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  {hasLocation ? 'Update Location' : 'Find Nearest Pharmacy'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {hasLocation && sortedPharmacies.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Nearby Pharmacies
            </h2>
            <Badge variant="secondary">
              {sortedPharmacies.length} found
            </Badge>
          </div>

          <div className="space-y-3">
            {sortedPharmacies.map(({ pharmacy, distance }, index) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                distance={distance}
                rank={index + 1}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 px-4">
            Distances are calculated using the Haversine formula based on your GPS coordinates.
            Pharmacy data is for demonstration purposes only.
          </p>
        </div>
      )}

      {/* Empty / Initial State */}
      {!hasLocation && !loading && !error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg mb-2">
            Ready to find pharmacies?
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            Click the button above to share your location and discover the nearest pharmacies sorted by distance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
            {[
              { icon: '📍', title: 'Share Location', desc: 'Allow browser location access' },
              { icon: '📊', title: 'Calculate Distance', desc: 'Haversine formula precision' },
              { icon: '🏥', title: 'View Results', desc: 'Sorted by proximity' },
            ].map((step) => (
              <div key={step.title} className="p-3 rounded-lg bg-card border border-border text-center">
                <div className="text-2xl mb-1">{step.icon}</div>
                <p className="text-xs font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
