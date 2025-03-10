import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import theme from '~/util/theme'; // Import your theme

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?name=${search}`);
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup>
      <Box
        border={`1px solid ${theme.colors.searchbar.border}`} // Light blue border
        borderRadius='50px'
        boxShadow="md" // Add a subtle shadow for depth
        background={theme.colors.searchbar.background} // Ensure the background is properly styled
      >
        <Input
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          bg={theme.colors.searchbar.background} // White background for the input
          color={'black'} // Dark text color for visibility
          border="none" // Remove border for a cleaner look
          borderRadius={'50px'}
          paddingRight="40px" // Add padding to the right for the search icon
          _placeholder={{ color: theme.colors.searchbar.text || 'gray.500' }} // Placeholder color
          _focus={{ 
            border: 'none', 
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme.colors.brand[500]}` // Focus shadow
          }} // Focus styling
        />
        <InputRightElement>
          <IconButton
            aria-label='Search'
            icon={<FaSearch />}
            onClick={handleSearch}
            variant="solid" // Change to solid for a more prominent look
            borderRadius={'50%'}
            bg={theme.colors.brand[500]} // Primary brand color for the button
            color="white" // White color for the search icon
            _hover={{ bg: theme.colors.brand[400] }} // Slightly lighter on hover
            _active={{ bg: theme.colors.brand[600] }} // Darker on click
          />
        </InputRightElement>
      </Box>
    </InputGroup>
  );
};

export default SearchBar;
