
'use client';

import { Search, Star, Group, Thermometer, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './language-switcher';
import { useLanguage } from '@/contexts/language-context';
import type { ElementPhase } from '@/lib/types';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ModeToggle } from './mode-toggle';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
  onToggleGroupByCategory: () => void;
  groupByCategory: boolean;
  onFilterByPhaseChange: (phase: ElementPhase | 'all') => void;
  currentPhase: ElementPhase | 'all';
  onClearFavorites: () => void;
  hasFavorites: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchChange, 
  onToggleFavorites, 
  showFavorites, 
  onToggleGroupByCategory, 
  groupByCategory,
  onFilterByPhaseChange,
  currentPhase,
  onClearFavorites,
  hasFavorites
}) => {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <Image 
              src="https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/refs/heads/main/atomo.png"
              alt="Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="hidden font-bold sm:inline-block text-primary">{t('appName')}</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="pl-9"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={currentPhase !== 'all' ? 'default' : 'outline'} size="icon" aria-label={t('filterByState')}>
                <Thermometer className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={currentPhase}
                onValueChange={(value) => onFilterByPhaseChange(value as ElementPhase | 'all')}
              >
                <DropdownMenuRadioItem value="all">{t('all')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Solid">{t('solid')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Liquid">{t('liquid')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Gas">{t('gas')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Unknown">{t('unknownState')}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
           <Button
            variant={groupByCategory ? 'default' : 'outline'}
            size="icon"
            onClick={onToggleGroupByCategory}
            aria-label={t('toggleGroups')}
          >
            <Group className="h-5 w-5" />
          </Button>
          <Button
            variant={showFavorites ? 'default' : 'outline'}
            size="icon"
            onClick={onToggleFavorites}
            aria-label={t('toggleFavorites')}
          >
            <Star className="h-5 w-5" />
          </Button>

          {hasFavorites && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" aria-label={t('clearFavorites')}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('clearFavoritesTitle')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('clearFavoritesDescription')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={onClearFavorites}>
                    {t('confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
