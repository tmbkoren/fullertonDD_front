import {
  Box,
  HStack,
  Input,
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

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
            <Input
              type="search"
              placeholder="Search"
              borderRadius={"full"}
              focusBorderColor={colorMode === "light" ? "blue.500" : "blue.300"} // color when focused
              borderColor={
                colorMode === "light" ? "gray.500" : "whiteAlpha.700"
              } // default border color
              _placeholder={{
                color: colorMode === "light" ? "gray.600" : "whiteAlpha.900",
              }}
            />
          </ListItem>

          <ListItem>
            <Link to="/login">
              <Icon mr={2} name="login" as={FaDoorOpen} />
              {"Login"}
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/cart">
              <Icon mr={2} name="cart" as={FaShoppingCart} />
              {"Cart"}
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
