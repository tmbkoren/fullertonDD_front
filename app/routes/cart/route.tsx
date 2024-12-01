import {
  Box,
  Button,
  Card,
  Image,
  Text,
  useColorMode,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import UserContext from '~/util/userContext';

const CartPage = () => {
    // getting user and cart and its methods from the context
  // user is not used right now, hence the next rule
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, cart, clearCart, removeItemFromCart } = useContext(UserContext);
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.toString()); // Ensure price is a number
      if (isNaN(price)) {
        return total; // Skip invalid prices
      }
      return total + price;
    }, 0);
  };

  return (
    <Box
      maxW="7xl"
      mx="auto"
      p={4}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
    >
      <VStack spacing={6} align="stretch">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color={colorMode === 'light' ? 'gray.800' : 'white'}
        >
          Shopping Cart
        </Text>

        {/* Cart is empty */}
        {cart.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="60vh"
            p={8}
          >
            <FaShoppingCart
              size={64}
              color={colorMode === 'light' ? '#4A5568' : '#CBD5E0'}
            />
            <Text
              mt={4}
              fontSize="2xl"
              fontWeight="bold"
              color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
            >
              Your cart is empty
            </Text>
          </Box>
        ) : (
          <HStack spacing={6} align="flex-start">
            {/* Cart Items List */}
            <Box flex="2">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    mb={4}
                    p={4}
                    shadow="lg"
                    borderRadius="xl"
                    bg={colorMode === 'light' ? 'white' : 'gray.700'}
                  >
                    <HStack spacing={4}>
                      <Image
                        src={item.image_url[0]}
                        alt={item.name}
                        boxSize="120px"
                        objectFit="cover"
                        borderRadius="lg"
                        fallbackSrc="https://via.placeholder.com/120"
                      />
                      <Box flex="1">
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color={colorMode === 'light' ? 'gray.800' : 'white'}
                        >
                          {item.name}
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          mt={2}
                          color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                        >
                          ${Number(item.price).toFixed(2)} {/* Explicitly cast price to number */}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                        >
                          In stock: {item.stock_quantity}
                        </Text>
                        <Button
                          mt={2}
                          colorScheme="red"
                          variant="outline"
                          onClick={() => removeItemFromCart(item)}
                        >
                          <Box as={FaTrash} mr={2} />
                          Remove
                        </Button>
                      </Box>
                    </HStack>
                  </Card>
                </motion.div>
              ))}
            </Box>

            {/* Order Summary */}
            <Box
              flex="1"
              p={6}
              shadow="lg"
              borderRadius="xl"
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                mb={4}
                color={colorMode === 'light' ? 'gray.800' : 'white'}
              >
                Order Summary
              </Text>
              <HStack justify="space-between" mb={4}>
                <Text
                  fontSize="lg"
                  color={colorMode === 'light' ? 'gray.800' : 'white'}
                >
                  Total Items:
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={colorMode === 'light' ? 'gray.800' : 'white'}
                >
                  {cart.length}
                </Text>
              </HStack>
              <HStack justify="space-between" mb={6}>
                <Text
                  fontSize="xl"
                  color={colorMode === 'light' ? 'gray.800' : 'white'}
                >
                  Total Amount:
                </Text>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={colorMode === 'light' ? 'gray.800' : 'white'}
                >
                  ${calculateTotal().toFixed(2)}
                </Text>
              </HStack>
              <Button
                width="full"
                colorScheme="red"
                variant="solid"
                mb={4}
                onClick={clearCart}
                _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
              >
                Clear Cart
              </Button>
              <Button
                width="full"
                colorScheme="blue"
                variant="solid"
                _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default CartPage;
