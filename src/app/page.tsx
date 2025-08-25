'use client';

import { useState, useMemo } from 'react';
import type { ElementData } from '@/lib/types';
import { elements } from '@/data/elements';
import Header from '@/components/header';
import PeriodicTable from '@/components/periodic-table';
import ElementDetail from '@/components/element-detail';
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const { language } = useLanguage();

  const filteredElements = useMemo(() => {
    if (!searchQuery) {
      return elements;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return elements.filter(
      (element) =>
        element.name[language]?.toLowerCase().includes(lowerCaseQuery) ||
        element.symbol.toLowerCase().includes(lowerCaseQuery) ||
        String(element.atomicNumber).includes(lowerCaseQuery)
    );
  }, [searchQuery, language]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onSearchChange={setSearchQuery} />
      <main className="flex-grow p-4 md:p-8">
        <PeriodicTable
          elements={filteredElements}
          onElementClick={setSelectedElement}
        />
      </main>
      <ElementDetail
        element={selectedElement}
        isOpen={!!selectedElement}
        onClose={() => setSelectedElement(null)}
      />
    </div>
  );
}
