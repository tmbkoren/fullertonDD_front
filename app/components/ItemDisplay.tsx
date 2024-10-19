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
import { Product } from '~/util/types';

interface ItemDisplayProps {
  item: Product
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({
  item,
}) => {
  return (
    <GridItem>
      <Card p={3}>
        <VStack gap={3}>
          <Box>
            <ChakraLink
              as={Link}
              to={`/product/${item.id}`}
            >
              <Image
                src={'http://localhost:3000' + item.image_url[0]}
                alt={item.name}
                borderRadius={'md'}
              />
            </ChakraLink>
          </Box>
          <VStack>
            <HStack justifyContent={'space-between'}>
              <Text as={'b'}>{item.name}</Text>
              <Text as={'b'}>{'$' + item.price}</Text>
            </HStack>
            <HStack>
              {Array.from({ length: 4 }).map((_, i) => (
                <Icon
                  key={i}
                  name='star'
                  color='brand.500'
                  as={FaStar}
                />
              ))}
              {Array.from({ length: 5 - 4 }).map((_, i) => (
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
