import {
  Box,
  Button,
  Card,
  GridItem,
  HStack,
  Icon,
  Text,
  Image,
  Link as ChakraLink,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const ItemDisplay = ({
  itemName,
  itemPrice,
  itemRating,
  itemImage,
  itemId,
}) => {
  return (
    <GridItem>
      <Card p={3}>
        <VStack gap={3}>
          <Box>
            <ChakraLink
              as={Link}
              to={`/item/${itemId}`}
            >
              <Image
                src={itemImage}
                alt={itemName}
                borderRadius={'md'}
              />
            </ChakraLink>
          </Box>
          <VStack>
            <HStack justifyContent={'space-between'}>
              <Text as={'b'}>{itemName}</Text>
              <Text as={'b'}>{'$' + itemPrice}</Text>
            </HStack>
            <HStack>
              {Array.from({ length: itemRating }).map((_, i) => (
                <Icon
                  key={i}
                  name='star'
                  color='brand.500'
                  as={FaStar}
                />
              ))}
              {Array.from({ length: 5 - itemRating }).map((_, i) => (
                <Icon
                  key={i}
                  name='star'
                  color='gray.300'
                  as={FaRegStar}
                />
              ))}
            </HStack>
          </VStack>
          <Button
            mt={3}
            borderRadius={'full'}
          >
            Add to Cart
          </Button>
        ß</VStack>{' '}
      </Card>
    </GridItem>
  );
};

export default ItemDisplay;
