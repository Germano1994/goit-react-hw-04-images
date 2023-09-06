import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={styles.ImageGalleryItemImage}
      onClick={() => onImageClick(image)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
