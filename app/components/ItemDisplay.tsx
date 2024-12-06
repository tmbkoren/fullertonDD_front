import {
  Box,
  Button,
  GridItem,
  HStack,
  Icon,
  Text,
  Image,
  Link as ChakraLink,
  VStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useContext } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Product } from '~/util/types';
import UserContext from '~/util/userContext';

interface ItemDisplayProps {
  item: Product;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ item }: ItemDisplayProps) => {
  const { addItemToCart } = useContext(UserContext);
  const { colorMode } = useColorMode();
  const shadowColor = useColorModeValue('5px 5px 0 black', '1px 1px 0 gray.600'); // ( light mode , dark mode)
  const borderColor = useColorModeValue('black', 'gray.700');

  return (
    <GridItem>
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="none"
        p={2}
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        overflow="hidden"
        boxShadow={shadowColor} // Shadow based on color mode
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{ transform: 'scale(1.03)', boxShadow: '2xl' }} // Subtle hover effect
      >
        <VStack gap={3} alignItems="stretch">
          {/* Product Image */}
          <Box>
            <ChakraLink as={Link} to={`/product/${item.id}`}>
              <Image
                src={item.image_url[0]}
                alt={item.name || 'Product Image'} // Ensure alt text is provided
                borderRadius="md"
                width="100%"
              />
            </ChakraLink>
          </Box>

          {/* Product Name and Price */}
          <VStack spacing={2} alignItems="stretch">
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              flexWrap="nowrap"
            >
              <Text
                as="b"
                isTruncated
                maxWidth="120px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                color={colorMode === 'light' ? 'black' : 'white'} // Adjust text color based on mode
              >
                {item.name}
              </Text>
              <Text 
                as="b"
                color={colorMode === 'light' ? 'black' : 'white'} // Adjust price color based on mode
              >
                {`$${item.price}`}
              </Text>
            </HStack>

            {/* Product Rating */}
            <HStack spacing={1} alignItems="center">
              {Array.from({ length: 4 }).map((_, i) => (
                <Icon key={i} as={FaStar} color="gold" />
              ))}
              {Array.from({ length: 5 - 4 }).map((_, i) => (
                <Icon key={i} as={FaRegStar} color="gold" />
              ))}
            </HStack>
          </VStack>

          {/* Add to Cart Button */}
          <Button
            variant="addToCart"
            onClick={() => addItemToCart(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            Add to Cart
          </Button>
        </VStack>
      </Box>
    </GridItem>
  );
};

export default ItemDisplay;
