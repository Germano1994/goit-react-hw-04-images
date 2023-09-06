import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

import styles from './App.module.css'; 

const API_KEY = '35924143-9020fc77f3274be39114409f4';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = (query, page) => {
    if (!query) return;

    setLoading(true);

    fetch(
      `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (page === 1) {
      setImages([]);
    }
    fetchImages(query, page);
  }, [query, page]);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={loadMoreImages}>Load More</Button>
      )}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
