import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdImageSearch } from 'react-icons/md';
import {
  StyledSearchbar,
  StyledForm,
  StyledFormButton,
  StyledFormButtonLabel,
  StyledFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error('Please text desired!');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <StyledSearchbar>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormButton type="submit">
          <StyledFormButtonLabel>
            <MdImageSearch style={{ width: 40, height: 40 }} />
          </StyledFormButtonLabel>
        </StyledFormButton>
        <StyledFormInput
          value={searchQuery}
          type="text"
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </StyledForm>
    </StyledSearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
