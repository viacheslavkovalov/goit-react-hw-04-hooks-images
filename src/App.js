import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import apiService from './services/apiService';
import {
  Searchbar,
  ImageGallery,
  Button,
  Loader,
  Modal,
  ErrorDisplay,
} from './components';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const searchImages = async () => {
      setIsLoading(true);
      try {
        const response = await apiService(searchQuery, page);
        setImages(prevImages => [...prevImages, ...response]);
        if (response.length === 0) {
          setError(`No results for ${searchQuery}!`);
        }
      } catch (error) {
        setError('Something went wrong. Try again!');
      } finally {
        setIsLoading(false);
      }
    };
    searchImages();
  }, [page, searchQuery]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = event => {
    setLargeImageURL(event.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: 'smooth',
      });
    }, 800);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {error && <ErrorDisplay texterror={error} />}
      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {isLoading && <Loader />}
      {!isLoading && images.length >= 12 && !error && (
        <Button onLoadMore={onLoadMore} />
      )}
      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={2000} position="top-right" />
    </StyledApp>
  );
}
