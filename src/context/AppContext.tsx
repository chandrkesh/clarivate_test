import React, { createContext, useState, ReactNode } from 'react';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface AppContextType {
  favorites: Photo[];
  toggleFavorite: (photo: Photo) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  const toggleFavorite = (photo: Photo) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === photo.id)) {
        return prev.filter((fav) => fav.id !== photo.id);
      }
      return [...prev, photo];
    });
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};
