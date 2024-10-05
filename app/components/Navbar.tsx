import { Box, HStack, Input, List, ListItem, Image, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { FaDoorOpen, FaShoppingCart } from 'react-icons/fa';
// testing

const Navbar = () => {
  return (
    <Box
      as='nav'
      p={5}
      borderBottom={'1px solid'}
    >
      <List>
        <HStack justifyContent={'space-around'}>
          <ListItem>
            <ChakraLink
              as={Link}
              to='/'
            >
              <Image
                src='/img/logo.svg'
                alt='logo'
                maxH={50}
              />
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
            <Input
              type='search'
              placeholder='Search'
              borderRadius={'full'}
            />
          </ListItem>

          <ListItem>
            <Link to='/login'>
            <Icon mr={2} name='login' as={FaDoorOpen}/>
            {"Login"}</Link>
          </ListItem>

          <ListItem>
            <Link to='/cart'>
              <Icon
                mr={2}
                name='cart'
                as={FaShoppingCart}
              />
              {'Cart'}
            </Link>
          </ListItem>
        </HStack>{' '}
      </List>
    </Box>
  );
};

export default Navbar;
