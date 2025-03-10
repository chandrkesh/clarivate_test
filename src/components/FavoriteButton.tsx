import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface Photo {
  id: number;
  title: string;
  url: string;
}

const FavoriteButton = ({ photo }: { photo: Photo }) => {
  const context = useContext(AppContext);

  if (!context) {
    return null; // Prevents crashes if AppContext is not available
  }

  const { favorites = [], toggleFavorite } = context;
  const isFavorite = favorites.some((fav) => fav.id === photo.id);

  return (
      <button
          style={{ backgroundColor: isFavorite ? "#841584" : "#4CAF50", color: "#fff", padding: "8px", border: "none", cursor: "pointer" }}
          onClick={() => toggleFavorite(photo)}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
  );
};

export default FavoriteButton;