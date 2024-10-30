import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = params.productId;
  const data = await fetch(
    process.env.BACKEND_DEV_URL + '/api/products/getOne/' + productId
  );
  const item = await data.json();
  const itemImages = item.image_url.map((url: string) => {
    return url;
  });
  return item ? { item, itemImages } : null;
};

const ItemPage = () => {
  const { item, itemImages } = useLoaderData<typeof loader>();
  console.log(itemImages);
  console.log(item);
  return (
    <Box h={'100%'}>
      <HStack
        justifyContent={'space-around'}
        h={'100%'}
      >
        <VStack>
          <Image
            src={itemImages[0]}
            alt={item.name}
            borderRadius={'md'}
          />
        </VStack>
        <VStack justifyContent={'space-around'}>
          <Text as={'b'}>{item.itemName}</Text>
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
          <Text as={'b'}>{'$' + item.price}</Text>
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
