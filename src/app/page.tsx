
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ElementData, ElementPhase } from '@/lib/types';
import { elements } from '@/data/elements';
import Header from '@/components/header';
import PeriodicTable from '@/components/periodic-table';
import ElementDetail from '@/components/element-detail';
import { useLanguage } from '@/contexts/language-context';
import { useFavorites } from '@/hooks/use-favorites';
import SplashScreen from '@/components/splash-screen';

function HomePageContent() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [filterByPhase, setFilterByPhase] = useState<ElementPhase | 'all'>('all');
  const { language } = useLanguage();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const elementNumber = searchParams.get('element');
    if (elementNumber) {
      const element = elements.find(el => el.atomicNumber === parseInt(elementNumber, 10));
      if (element) {
        setSelectedElement(element);
      }
    }
  }, [searchParams, loading]);

  const filteredElements = useMemo(() => {
    let elementsToFilter = [...elements];
    
    if (showFavorites) {
      elementsToFilter = elementsToFilter.filter(el => favorites.includes(el.atomicNumber));
    }
    
    if (filterByPhase !== 'all') {
      elementsToFilter = elementsToFilter.filter(el => el.phase === filterByPhase);
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      elementsToFilter = elementsToFilter.filter(
        (element) =>
          element.name[language]?.toLowerCase().includes(lowerCaseQuery) ||
          element.symbol.toLowerCase().includes(lowerCaseQuery) ||
          String(element.atomicNumber).includes(lowerCaseQuery)
      );
    }
    
    return elementsToFilter;
  }, [searchQuery, language, showFavorites, favorites, filterByPhase]);

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
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('element');
    window.history.pushState({}, '', newUrl);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        onSearchChange={setSearchQuery} 
        onToggleFavorites={handleToggleFavorites}
        showFavorites={showFavorites}
        onToggleGroupByCategory={handleToggleGroupByCategory}
        groupByCategory={groupByCategory}
        onFilterByPhaseChange={setFilterByPhase}
        currentPhase={filterByPhase}
        onClearFavorites={clearFavorites}
        hasFavorites={favorites.length > 0}
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

export default function Home() {
  return (
    <React.Suspense fallback={<SplashScreen />}>
      <HomePageContent />
    </React.Suspense>
  )
}
