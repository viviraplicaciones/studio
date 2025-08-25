
'use client';

import ElementCard from './element-card';
import type { ElementData } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';

interface PeriodicTableProps {
  elements: ElementData[];
  onElementClick: (element: ElementData) => void;
  favorites: number[];
  onToggleFavorite: (atomicNumber: number) => void;
  groupByCategory: boolean;
}

const categoryOrder = [
  'alkali-metal',
  'alkaline-earth-metal',
  'lanthanide',
  'actinide',
  'transition-metal',
  'post-transition-metal',
  'metalloid',
  'polyatomic-nonmetal',
  'diatomic-nonmetal',
  'noble-gas',
  'unknown',
];

const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements, onElementClick, favorites, onToggleFavorite, groupByCategory }) => {
  const { t } = useLanguage();

  if (groupByCategory) {
    const grouped = elements.reduce((acc, el) => {
      (acc[el.category] = acc[el.category] || []).push(el);
      return acc;
    }, {} as Record<string, ElementData[]>);

    return (
      <div className="space-y-8">
        {categoryOrder.map(category => {
          const categoryElements = grouped[category];
          if (!categoryElements || categoryElements.length === 0) return null;
          return (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 text-primary">{t(category)}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                {categoryElements.map(element => (
                  <ElementCard
                    key={element.atomicNumber}
                    element={element}
                    onClick={() => onElementClick(element)}
                    style={{}}
                    isFavorite={favorites.includes(element.atomicNumber)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(10, minmax(0, 1fr))',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {elements.map((element) => (
        <ElementCard
          key={element.atomicNumber}
          element={element}
          onClick={() => onElementClick(element)}
          style={{ gridColumnStart: element.xpos, gridRowStart: element.ypos }}
          isFavorite={favorites.includes(element.atomicNumber)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PeriodicTable;
