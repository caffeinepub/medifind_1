import { X, Pill, Info, FlaskConical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Disease } from '../backend';

interface DiseaseDetailProps {
  disease: Disease;
  onClose: () => void;
}

export function DiseaseDetail({ disease, onClose }: DiseaseDetailProps) {
  return (
    <Card className="border-border shadow-card-hover animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-display">{disease.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {disease.medicines.length} treatment{disease.medicines.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0 -mt-1 -mr-1 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <div className="flex gap-2.5 p-3 rounded-lg bg-secondary/60">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">{disease.description}</p>
        </div>

        <Separator />

        {/* Medicines */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Pill className="w-4 h-4 text-primary" />
            Recommended Medicines
          </h4>
          <div className="space-y-2.5">
            {disease.medicines.map((medicine, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {medicine.dosageNotes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30">
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            ⚠️ <strong>Medical Disclaimer:</strong> This information is for educational purposes only. Always consult a qualified healthcare professional before starting any medication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
