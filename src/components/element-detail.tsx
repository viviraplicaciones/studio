
'use client';

import { useState } from 'react';
import { Heart, Share2, Users, Languages, Sparkles, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { ElementData } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Separator } from '@/components/ui/separator';
import { generateFunFact } from '@/ai/flows/fun-fact-flow';

interface ElementDetailProps {
  element: ElementData | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (atomicNumber: number) => void;
}

const ElementDetail: React.FC<ElementDetailProps> = ({ element, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [funFact, setFunFact] = useState('');
  const [isLoadingFact, setIsLoadingFact] = useState(false);

  if (!element) return null;

  const handleShare = async () => {
    const shareData = {
      title: `${t('appName')}: ${element.name[language]}`,
      text: `${element.name[language]} (${element.symbol}) - ${t('atomicNumber')}: ${element.atomicNumber}. ${element.summary[language]}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: t('copiedToClipboardTitle'),
          description: t('copiedToClipboardDescription'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('shareError'),
      });
    }
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(element.atomicNumber);
  };

  const handleGenerateFact = async () => {
    if (!element) return;
    setIsLoadingFact(true);
    setFunFact('');
    try {
      const response = await generateFunFact({
        elementName: element.name[language],
        elementSymbol: element.symbol,
        elementSummary: element.summary[language],
        language,
      });
      setFunFact(response.fact);
    } catch (error) {
      console.error('Error generating fun fact:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('funFactError'),
      });
    } finally {
      setIsLoadingFact(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-3xl font-bold text-primary">
            {element.name[language]} ({element.symbol})
          </SheetTitle>
          <SheetDescription className="text-lg">
            {t('atomicNumber')}: {element.atomicNumber}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <p className="text-base leading-relaxed">{element.summary[language]}</p>
          
          <div>
            <h3 className="font-semibold text-xl mb-2 text-primary">{t('properties')}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><strong>{t('atomicMass')}:</strong> {element.atomic_mass.toPrecision(6)}</li>
              <li><strong>{t('category')}:</strong> {t(element.category)}</li>
              <li><strong>{t('phase')}:</strong> {t(element.phase.toLowerCase())}</li>
              <li><strong>{t('electronConfiguration')}:</strong> {element.electron_configuration}</li>
              <li><strong>{t('density')}:</strong> {element.density ? `${element.density} g/cm³` : 'N/A'}</li>
              {element.appearance && <li><strong>{t('appearance')}:</strong> {element.appearance}</li>}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold text-xl mb-4 text-primary">{t('historyAndDiscovery')}</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
                <p>{element.history[language]}</p>
                <div className="flex items-center gap-4">
                  {element.discovered_by && <span className="flex items-center gap-2"><Users className="w-4 h-4 text-accent"/> {element.discovered_by}</span>}
                </div>
                 {element.named_by && <div className="flex items-center gap-2"><Languages className="w-4 h-4 text-accent"/> <strong>{t('namedBy')}:</strong> {element.named_by}</div>}
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="font-semibold text-xl mb-4 text-primary">{t('funFactTitle')}</h3>
            <Button onClick={handleGenerateFact} disabled={isLoadingFact}>
              {isLoadingFact ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {t('generateFunFact')}
            </Button>
            {funFact && (
              <div className="mt-4 p-4 bg-accent/10 border-l-4 border-accent text-accent-foreground rounded-r-lg">
                <p className="text-sm">{funFact}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
             <Button onClick={handleFavoriteClick} variant={isFavorite ? 'default' : 'outline'} size="sm">
              <Heart className="mr-2 h-4 w-4" />
              {isFavorite ? t('favorited') : t('addToFavorites')}
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              {t('share')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ElementDetail;
