import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import FavoriteButton from '../components/FavoriteButton';

const ListPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { favorites, toggleFavorite } = useContext(AppContext);

  const loadPhotos = async () => {
    setLoading(true);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);
    setPhotos((prev) => [...prev, ...response.data]);
    setLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [page]);

  return (
    <div className="list-page" onScroll={handleScroll}>
      <h1>List of Items Page</h1>
      <div className="photo-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h3>{photo.title}</h3>
            <FavoriteButton photo={photo} />
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="back-button">Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default ListPage;
