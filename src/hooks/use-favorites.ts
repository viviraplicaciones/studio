'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'periodic-table-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  const saveFavorites = (newFavorites: number[]) => {
    try {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  };

  const toggleFavorite = useCallback((atomicNumber: number) => {
    const newFavorites = favorites.includes(atomicNumber)
      ? favorites.filter((id) => id !== atomicNumber)
      : [...favorites, atomicNumber];
    saveFavorites(newFavorites);
  }, [favorites]);

  return { favorites, toggleFavorite };
};
