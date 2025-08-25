
'use client';

import ElementCard from './element-card';
import type { ElementData } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

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

const categoryColorMap: { [key: string]: string } = {
  'noble-gas': 'bg-purple-400 text-white',
  'alkali-metal': 'bg-red-400 text-white',
  'alkaline-earth-metal': 'bg-orange-400 text-white',
  'diatomic-nonmetal': 'bg-green-400 text-white',
  'polyatomic-nonmetal': 'bg-green-500 text-white',
  metalloid: 'bg-teal-400 text-white',
  'post-transition-metal': 'bg-blue-400 text-white',
  'transition-metal': 'bg-indigo-400 text-white',
  lanthanide: 'bg-yellow-400 text-black',
  actinide: 'bg-amber-500 text-black',
  unknown: 'bg-gray-400 text-white',
};

const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements, onElementClick, favorites, onToggleFavorite, groupByCategory }) => {
  const { t } = useLanguage();

  if (groupByCategory) {
    const grouped = elements.reduce((acc, el) => {
      (acc[el.category] = acc[el.category] || []).push(el);
      return acc;
    }, {} as Record<string, ElementData[]>);

    return (
      <Accordion type="multiple" className="w-full space-y-2">
        {categoryOrder.map(category => {
          const categoryElements = grouped[category];
          if (!categoryElements || categoryElements.length === 0) return null;
          
          const colorClass = categoryColorMap[category] || 'bg-gray-200';

          return (
            <AccordionItem value={category} key={category} className="border-none">
              <AccordionTrigger className={cn("text-lg font-bold p-4 rounded-md", colorClass)}>
                {t(category)}
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-muted/50 rounded-b-md">
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
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
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
