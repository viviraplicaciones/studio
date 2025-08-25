
'use client';

import ElementCard from './element-card';
import type { ElementData } from '@/lib/types';

interface PeriodicTableProps {
  elements: ElementData[];
  onElementClick: (element: ElementData) => void;
  favorites: number[];
  onToggleFavorite: (atomicNumber: number) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements, onElementClick, favorites, onToggleFavorite }) => {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
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
