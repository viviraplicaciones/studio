
'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ElementData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

interface ElementCardProps {
  element: ElementData;
  onClick: () => void;
  style: React.CSSProperties;
  isFavorite: boolean;
  onToggleFavorite: (atomicNumber: number) => void;
}

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

const ElementCard: React.FC<ElementCardProps> = ({ element, onClick, style, isFavorite, onToggleFavorite }) => {
  const { language } = useLanguage();
  
  const colorClass = categoryColorMap[element.category] || 'bg-gray-400';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(element.atomicNumber);
  };

  return (
    <motion.div
      style={style}
      className={cn(
        'relative p-1.5 rounded-md cursor-pointer shadow-md transition-transform transform hover:scale-110 hover:z-10',
        colorClass
      )}
      onClick={onClick}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      layoutId={`element-card-${element.atomicNumber}`}
    >
      <div className="flex justify-between items-start text-xs">
        <span>{element.atomicNumber}</span>
        <button
          onClick={handleFavoriteClick}
          aria-label="Toggle Favorite"
          className="p-1 z-20"
        >
          <Heart
            className={cn('w-3 h-3 transition-colors', isFavorite ? 'text-red-500 fill-current' : 'text-inherit')}
          />
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">{element.symbol}</h2>
        <p className="text-[10px] truncate">{element.name[language]}</p>
      </div>
    </motion.div>
  );
};

export default ElementCard;
