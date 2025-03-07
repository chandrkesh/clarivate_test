import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const FavoriteButton = ({ photo }: { photo: any }) => {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const isFavorite = favorites.some((fav) => fav.id === photo.id);

  return (
    <button onClick={() => toggleFavorite(photo)}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
