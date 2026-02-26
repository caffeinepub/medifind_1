import { useState } from 'react';
import { Activity, MapPin, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InstallPrompt } from '@/components/InstallPrompt';

interface LayoutProps {
  children: React.ReactNode;
  activePage: 'diseases' | 'pharmacy';
  onNavigate: (page: 'diseases' | 'pharmacy') => void;
}

export function Layout({ children, activePage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'medifind-app');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => onNavigate('diseases')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-sm">
                <img
                  src="/assets/generated/mediguide-logo.dim_128x128.png"
                  alt="MediFind"
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
                      parent.appendChild(icon.firstChild!);
                    }
                  }}
                />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-foreground leading-none">MediFind</span>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">Health & Pharmacy Guide</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate('diseases')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activePage === 'diseases'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Activity className="w-4 h-4" />
                Disease Directory
              </button>
              <button
                onClick={() => onNavigate('pharmacy')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activePage === 'pharmacy'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Find Pharmacy
              </button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-3 space-y-1 animate-fade-in">
              <button
                onClick={() => { onNavigate('diseases'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activePage === 'diseases'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Activity className="w-4 h-4" />
                Disease Directory
              </button>
              <button
                onClick={() => { onNavigate('pharmacy'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activePage === 'pharmacy'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Find Pharmacy
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Install Prompt Banner */}
      <InstallPrompt />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-hero flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">MediFind</span>
              <span className="text-muted-foreground text-sm">© {year}</span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
