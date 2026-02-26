import { ChevronRight, Pill } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Disease } from '../backend';

interface DiseaseCardProps {
  disease: Disease;
  onClick: (disease: Disease) => void;
  isSelected: boolean;
}

export function DiseaseCard({ disease, onClick, isSelected }: DiseaseCardProps) {
  return (
    <Card
      className={`cursor-pointer card-hover border transition-all duration-200 ${
        isSelected
          ? 'border-primary shadow-card-hover ring-2 ring-primary/20'
          : 'border-border shadow-card hover:border-primary/40'
      }`}
      onClick={() => onClick(disease)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'bg-primary' : 'bg-secondary'
              }`}>
                <Pill className={`w-4 h-4 ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
                {disease.name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 ml-10">
              {disease.description}
            </p>
            <div className="mt-2 ml-10">
              <Badge variant="secondary" className="text-xs">
                {disease.medicines.length} medicine{disease.medicines.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${
            isSelected ? 'text-primary rotate-90' : 'text-muted-foreground'
          }`} />
        </div>
      </CardContent>
    </Card>
  );
}
