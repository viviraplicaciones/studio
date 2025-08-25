
'use client';

import { useState, useMemo } from 'react';
import type { ElementData } from '@/lib/types';
import { elements } from '@/data/elements';
import Header from '@/components/header';
import PeriodicTable from '@/components/periodic-table';
import ElementDetail from '@/components/element-detail';
import { useLanguage } from '@/contexts/language-context';
import { useFavorites } from '@/hooks/use-favorites';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const { language } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  const filteredElements = useMemo(() => {
    let elementsToFilter = elements;
    if (showFavorites) {
      elementsToFilter = elements.filter(el => favorites.includes(el.atomicNumber));
    }

    if (!searchQuery) {
      return elementsToFilter;
    }
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return elementsToFilter.filter(
      (element) =>
        element.name[language]?.toLowerCase().includes(lowerCaseQuery) ||
        element.symbol.toLowerCase().includes(lowerCaseQuery) ||
        String(element.atomicNumber).includes(lowerCaseQuery)
    );
  }, [searchQuery, language, showFavorites, favorites]);

  const handleToggleFavorites = () => {
    setShowFavorites(prev => !prev);
  }

  const handleToggleGroupByCategory = () => {
    setGroupByCategory(prev => !prev);
  };

  const handleElementClick = (element: ElementData) => {
    setSelectedElement(element);
  };

  const handleCloseDetail = () => {
    setSelectedElement(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        onSearchChange={setSearchQuery} 
        onToggleFavorites={handleToggleFavorites}
        showFavorites={showFavorites}
        onToggleGroupByCategory={handleToggleGroupByCategory}
        groupByCategory={groupByCategory}
      />
      <main className="flex-grow p-4 md:p-8">
        <PeriodicTable
          elements={filteredElements}
          onElementClick={handleElementClick}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          groupByCategory={groupByCategory}
        />
      </main>
      <ElementDetail
        element={selectedElement}
        isOpen={!!selectedElement}
        onClose={handleCloseDetail}
        isFavorite={selectedElement ? favorites.includes(selectedElement.atomicNumber) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
