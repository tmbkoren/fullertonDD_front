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
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { FaDoorOpen, FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import UserContext from "~/util/userContext";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { cart } = useContext(UserContext);
  return (
    <Box
      as="nav"
      p={5}
      borderBottom={`1px solid`}
      borderBottomColor={colorMode === "light" ? "gray.200" : "whiteAlpha.300"}
      bgGradient={
        colorMode === "light" ? "linear(to-b, gray.200, gray.100)" : "none"
      }
      backgroundColor={colorMode === "light" ? "none" : "rgba(0, 0, 0, 0.3)"}
      backdropFilter={colorMode === "light" ? "none" : "blur(10px)"}
      color={colorMode === "light" ? "black" : "white"}
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <List>
        <HStack justifyContent={"space-around"}>
          <ListItem>
            <ChakraLink as={Link} to="/">
              <Image src="/img/logo.svg" alt="logo" maxH={50} />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>

          <ListItem>
            <Link to="/about">About</Link>
          </ListItem>

          <ListItem>
            <Link to="/contact">Contact</Link>
          </ListItem>

          <ListItem>
            <SearchBar />
          </ListItem>

          <ListItem>
            <Link to='/addItem'>Add Item</Link>
          </ListItem>

          <ListItem>
            <Link to='/login'>
              <Icon
                mr={2}
                name='login'
                as={FaDoorOpen}
              />
              {'Login'}
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/cart">
              <Icon mr={2} name="cart" as={FaShoppingCart} />
              {`Cart (${cart.length})`}
            </Link>
          </ListItem>
          <ListItem ml={3}>
            <IconButton
              icon={
                colorMode === "light" ? <MdDarkMode /> : <MdOutlineWbSunny />
              }
              bg={"transparent"}
              aria-label="Toggle Dark Mode"
              onClick={toggleColorMode}
            />
          </ListItem>
        </HStack>
      </List>
    </Box>
  );
};

export default Navbar;
