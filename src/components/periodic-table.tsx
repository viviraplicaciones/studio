
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

  const defaultView = (
    <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-10 gap-1 max-w-[1200px] mx-auto">
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

  const responsiveView = (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-2">
        {elements.sort((a,b) => a.atomicNumber - b.atomicNumber).map((element) => (
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
  );

  return (
    <>
      <div className="hidden md:grid">{defaultView}</div>
      <div className="grid md:hidden">{responsiveView}</div>
    </>
  );
};

export default PeriodicTable;
