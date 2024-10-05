import { Box, HStack, VStack, Image, Text, Button, Icon } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import mockData from '~/temp/mockData.json';

export const loader = async ({ params }) => {
  console.log(params);
  console.log(mockData);
  const itemId = params.itemId;
  const item = mockData.find((item) => item.itemId == itemId);
  return item ? { item } : null;
};

const ItemPage = () => {
  const item = useLoaderData().item;
  console.log(item);
  return (
    <Box h={'100%'}>
      <HStack justifyContent={'space-around'} h={'100%'}>
        <VStack>
          <Image
            src={item.itemImage}
            alt={item.itemName}
            borderRadius={'md'}
          />
        </VStack>
        <VStack justifyContent={'space-around'}>
          <Text as={'b'}>{item.itemName}</Text>
          <HStack>
            {Array.from({ length: item.itemRating }).map((_, i) => (
              <Icon
                key={i}
                name='star'
                color='brand.500'
                as={FaStar}
              />
            ))}
            {Array.from({ length: 5 - item.itemRating }).map((_, i) => (
              <Icon
                key={i}
                name='star'
                color='gray.300'
                as={FaRegStar}
              />
            ))}
          </HStack>
          <Text as={'b'}>{'$' + item.itemPrice}</Text>
          <HStack>
            <Button>Add to Cart</Button>
            <Button>Buy Now</Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ItemPage;
