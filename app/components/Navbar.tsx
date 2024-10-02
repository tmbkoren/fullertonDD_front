import { Box, HStack, Input, List, ListItem } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

const Navbar = () => {
  return (
    <Box as='nav' p={5}>
      <List>
        <HStack justifyContent={'space-between'}>
          <ListItem>
            <Link to='/'>Home</Link>
          </ListItem>

          <ListItem>
            <Link to='/about'>About</Link>
          </ListItem>

          <ListItem>
            <Link to='/contact'>Contact</Link>
          </ListItem>

          <ListItem>
            <Input
              type='search'
              placeholder='Search'
            />
          </ListItem>

          <ListItem>
            <Link to='/login'>Login</Link>
          </ListItem>

          <ListItem>
            <Link to='/cart'>Cart</Link>
          </ListItem>
        </HStack>{' '}
      </List>
    </Box>
  );
};

export default Navbar;
