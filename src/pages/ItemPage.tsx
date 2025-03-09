import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import FavoriteButton from '../components/FavoriteButton';

const ListPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);  
  const [page, setPage] = useState(1);              
  const [loading, setLoading] = useState(false);    
  const [hasMoreData, setHasMoreData] = useState(true); 
  const { favorites, toggleFavorite } = useContext(AppContext);
  const listRef = useRef<HTMLDivElement>(null); 

  const loadPhotos = async () => {
    if (loading || !hasMoreData) return; 
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
      );

      
      if (response.data.length === 0) {
        setHasMoreData(false); 
      }
      setPhotos((prev) => {
        const newPhotos = response.data.filter(
          (photo: any) => !prev.some((existingPhoto: any) => existingPhoto.id === photo.id)
        );
        return [...prev, ...newPhotos];  
      });
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!listRef.current || !hasMoreData) return; 
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 10 && !loading) {
      setPage((prevPage) => prevPage + 1);  
    }
  };
  useEffect(() => {
    loadPhotos();
  }, [page]);

  useEffect(() => {
    const currentListRef = listRef.current;
    if (currentListRef) {
      currentListRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentListRef) {
        currentListRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading, hasMoreData]);

  return (
    <div className="list-page" ref={listRef}>
      <Link to="/">
        <button className="back-button">Back to Dashboard</button>
      </Link>
      <h1>List of Items Page</h1>
      <div className="photo-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <b>ID : {photo.id}</b>
            <b>Image : </b><img src={photo.thumbnailUrl} alt={photo.title} />
            <h6><b>Title : </b>{photo.title}</h6>
            <FavoriteButton photo={photo} />
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="back-button">Back to Dashboard</button>
      </Link>
      {loading && <div>Loading...</div>} 
      {!hasMoreData && <div>No more data to load.</div>} 
    </div>
  );
};

export default ListPage;
