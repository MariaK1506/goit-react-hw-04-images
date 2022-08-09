import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchBar,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setSearchQuery(value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error('Enter valid search');
    }
    onSubmit(searchQuery);
    formReset();
  };

  const formReset = () => {
    setSearchQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          value={searchQuery}
          onChange={handleInputChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
}

export default Searchbar;
