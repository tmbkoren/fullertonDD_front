import {
  Box,
  Card,
  HStack,
  Image,
  Select,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useContext } from 'react';

import { Product } from '~/util/types';
import UserContext from '~/util/userContext';

interface CartItemProps {
  item: Product;
  quantity: number;
}

const CartItem = ({ item, quantity }: CartItemProps) => {
  // const [qty, setQty] = useState(quantity);
  const { setQuantity } = useContext(UserContext);
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setQty(parseInt(e.target.value));
    setQuantity(item, parseInt(e.target.value));
  };

  return (
    <motion.div
      key={item.id}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        mb={4}
        p={4}
        shadow='lg'
        borderRadius='xl'
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
      >
        <HStack spacing={4}>
          <Image
            src={item.image_url[0]}
            alt={item.name}
            boxSize='120px'
            objectFit='cover'
            borderRadius='lg'
            fallbackSrc='https://via.placeholder.com/120'
          />
          <Box flex='1'>
            <Text
              fontSize='xl'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              {item.name}
            </Text>
            <Text
              fontSize='lg'
              fontWeight='semibold'
              mt={2}
              color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
            >
              ${Number(item.price).toFixed(2)}{' '}
              {/* Explicitly cast price to number */}
            </Text>
            <Text
              fontSize='sm'
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            >
              In stock: {item.stock_quantity}
            </Text>
            <HStack mt={2}>
              <Text>Quantity:</Text>
              <Select
                value={quantity}
                onChange={handleQtyChange}
              >
                <option value={0}>0 (Remove)</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Select>
            </HStack>
          </Box>
        </HStack>
      </Card>
    </motion.div>
  );
};

export default CartItem;
