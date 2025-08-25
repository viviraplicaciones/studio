
'use client';

import { Search, Star, Group } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './language-switcher';
import { useLanguage } from '@/contexts/language-context';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
  onToggleGroupByCategory: () => void;
  groupByCategory: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onToggleFavorites, showFavorites, onToggleGroupByCategory, groupByCategory }) => {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary"><rect width="256" height="256" fill="none"></rect><path d="M148,152l-20.3,35.1a16,16,0,0,1-27.4,0L79.9,152,59.5,187.1a16,16,0,0,1-27.4,0L11.8,152,32,117.3,52.2,152l20.4-35.1a16,16,0,0,1,27.4,0L120.4,152l20.3-35.1a16,16,0,0,1,27.4,0L188.5,152l20.4-34.7,20.2,34.7-20.3,35.1a16,16,0,0,1-27.4,0L160.8,152Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M128,216,108,181.3,128,146.7l20,34.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M100,108,80,73.3,100,38.7l20,34.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M180,108l-20-34.7L180,38.7l20,34.6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
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
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
