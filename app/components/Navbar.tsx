import {
  Box,
  HStack,
  List,
  ListItem,
  Image,
  Link as ChakraLink,
  Icon,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { FaDoorClosed, FaDoorOpen, FaShoppingCart } from 'react-icons/fa';
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import SearchBar from './SearchBar';
import { useContext } from 'react';
import UserContext from '~/util/userContext';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { cart, user } = useContext(UserContext);

  return (
    <Box 
      p={2}
      bg={colorMode === 'dark' ? 'navbar.dark.bg' : 'navbar.light.bg'}
      color={colorMode === 'dark' ? 'navbar.dark.text' : 'navbar.light.text'}
    >
      <List>
        <HStack justifyContent={'space-around'}>
          <ListItem>
            <ChakraLink as={Link} to='/'>
              <Image src='/img/logo.svg' alt='logo' maxH={70} />
            </ChakraLink>
          </ListItem>
          
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
            <SearchBar />
          </ListItem>

          <ListItem>
            <Link to='/addItem'>Add Item</Link>
          </ListItem>

          <ListItem>
            {user ? (
              <Link to='/logout'>
                <Icon mr={2} name='logout' as={FaDoorClosed} />
                Logout
              </Link>
            ) : (
              <Link to='/login'>
                <Icon mr={2} name='login' as={FaDoorOpen} />
                {'Login'}
              </Link>
            )}
          </ListItem>

          <ListItem>
            <Link to='/cart'>
              <Icon mr={2} name='cart' as={FaShoppingCart} />
              {`Cart (${cart.length})`}
            </Link>
          </ListItem>

          <ListItem ml={3}>
            <IconButton
              icon={colorMode === 'light' ? <MdDarkMode /> : <MdOutlineWbSunny />}
              bg={'transparent'}
              color='white' // Make sure the icon is always white
              aria-label='Toggle Dark Mode'
              onClick={toggleColorMode}
            />
          </ListItem>
        </HStack>
      </List>
    </Box>
  );
};

export default Navbar;
