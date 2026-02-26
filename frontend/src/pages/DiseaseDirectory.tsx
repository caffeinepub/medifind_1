import { useState, useMemo, useEffect } from 'react';
import { Search, Activity, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DiseaseCard } from '../components/DiseaseCard';
import { DiseaseDetail } from '../components/DiseaseDetail';
import { useGetAllDiseases, useInitialize } from '../hooks/useQueries';
import type { Disease } from '../backend';

export function DiseaseDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const { data: diseases, isLoading, error } = useGetAllDiseases();
  const initMutation = useInitialize();

  // Auto-initialize if no diseases are found
  useEffect(() => {
    if (!isLoading && diseases && diseases.length === 0 && !initMutation.isPending) {
      initMutation.mutate();
    }
  }, [isLoading, diseases]);

  const filteredDiseases = useMemo(() => {
    if (!diseases) return [];
    if (!searchQuery.trim()) return diseases;
    const q = searchQuery.toLowerCase();
    return diseases.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.medicines.some((m) => m.name.toLowerCase().includes(q))
    );
  }, [diseases, searchQuery]);

  const handleSelectDisease = (disease: Disease) => {
    setSelectedDisease(prev => prev?.name === disease.name ? null : disease);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Disease Directory</h1>
            <p className="text-sm text-muted-foreground">
              Browse diseases and their recommended treatments
            </p>
          </div>
        </div>

        {/* Stats bar */}
        {diseases && diseases.length > 0 && (
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-primary" />
              <strong className="text-foreground">{diseases.length}</strong> diseases listed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <strong className="text-foreground">
                {diseases.reduce((acc, d) => acc + d.medicines.length, 0)}
              </strong>{' '}
              medicines catalogued
            </span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search diseases, symptoms, or medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11 bg-card border-border focus:border-primary"
        />
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load diseases. Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Initializing state */}
      {initMutation.isPending && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-secondary/50 rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          Setting up disease database...
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Disease List */}
          <div className="space-y-3">
            {filteredDiseases.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground font-medium">No diseases found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try searching with different keywords
                </p>
              </div>
            )}

            {filteredDiseases.length === 0 && !searchQuery && !initMutation.isPending && (
              <div className="text-center py-12">
                <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground font-medium">No diseases available</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The database is being initialized...
                </p>
              </div>
            )}

            {filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.name}
                disease={disease}
                onClick={handleSelectDisease}
                isSelected={selectedDisease?.name === disease.name}
              />
            ))}

            {searchQuery && filteredDiseases.length > 0 && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                Showing {filteredDiseases.length} of {diseases?.length ?? 0} results
              </p>
            )}
          </div>

          {/* Disease Detail Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedDisease ? (
              <DiseaseDetail
                disease={selectedDisease}
                onClose={() => setSelectedDisease(null)}
              />
            ) : (
              <div className="hidden lg:flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-border text-center p-8">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">Select a disease</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click any disease card to view details and medicines
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
