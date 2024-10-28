import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {

    navigate(`/search?name=${search}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup>
      <Input
        type='search'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <InputRightElement>
        <IconButton
          aria-label='Search'
          icon={<FaSearch />}
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
