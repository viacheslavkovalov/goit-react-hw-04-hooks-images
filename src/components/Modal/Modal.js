import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, onToggleModal }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handleBackDrop}>
      <StyledModal>
        <img src={largeImageURL} alt="largeImage" />
      </StyledModal>
    </StyledOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
