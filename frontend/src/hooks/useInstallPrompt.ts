import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    __installPrompt: BeforeInstallPromptEvent | null;
  }
}

interface UseInstallPromptReturn {
  canInstall: boolean;
  isIOS: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
  dismiss: () => void;
  isDismissed: boolean;
}

export function useInstallPrompt(): UseInstallPromptReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    // Read the prompt that was captured before React mounted
    () => window.__installPrompt ?? null
  );
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('medifind-install-dismissed') === 'true';
  });

  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream;

  const isInStandaloneMode =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  useEffect(() => {
    if (isInStandaloneMode) {
      setIsInstalled(true);
      return;
    }

    // If the prompt was already captured before React mounted, use it
    if (window.__installPrompt) {
      setDeferredPrompt(window.__installPrompt);
    }

    // Listen for the custom event dispatched by the early index.html listener
    // (fires if beforeinstallprompt happens after React mounts)
    const onPromptReady = () => {
      if (window.__installPrompt) {
        setDeferredPrompt(window.__installPrompt);
      }
    };

    // Also listen directly in case the event fires after React mounts
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.__installPrompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('installpromptready', onPromptReady);
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.__installPrompt = null;
    };
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('installpromptready', onPromptReady);
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [isInStandaloneMode]);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    window.__installPrompt = null;
  };

  const dismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('medifind-install-dismissed', 'true');
  };

  const canInstall = !!deferredPrompt || isIOS;

  return {
    canInstall,
    isIOS,
    isInstalled,
    promptInstall,
    dismiss,
    isDismissed,
  };
}
