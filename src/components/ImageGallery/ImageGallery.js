import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-to-top';
import { ReactComponent as UpArrow } from '../../icons/arrow-top.svg';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

export default function ImageGallery({ images, onOpenModal }) {
  return (
    <StyledImageGallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
      ))}
      <ScrollToTop
        smooth
        top={40}
        style={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          right: '60px',
          bottom: '60px',
        }}
        component={<UpArrow width={60} height={60} />}
      />
    </StyledImageGallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
