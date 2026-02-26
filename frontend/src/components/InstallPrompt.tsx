import { Share, Plus, Download, X } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const { canInstall, isIOS, isInstalled, promptInstall, dismiss, isDismissed } = useInstallPrompt();

  if (!canInstall || isInstalled || isDismissed) return null;

  if (isIOS) {
    return (
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 animate-fade-in">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shrink-0">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">Add MediFind to Home Screen</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 flex-wrap">
                Tap
                <span className="inline-flex items-center gap-0.5 bg-muted px-1.5 py-0.5 rounded text-foreground font-medium">
                  <Share className="w-3 h-3" /> Share
                </span>
                then
                <span className="bg-muted px-1.5 py-0.5 rounded text-foreground font-medium">
                  Add to Home Screen
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 animate-fade-in">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shrink-0">
            <Download className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-tight">Install MediFind</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add to your home screen for quick access</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={promptInstall}
            className="h-8 text-xs px-3 gradient-hero text-white border-0 hover:opacity-90"
          >
            Add to Home Screen
          </Button>
          <button
            onClick={dismiss}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
