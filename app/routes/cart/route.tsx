import { Box, Button, Card, Image, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import UserContext from '~/util/userContext';

const CartPage = () => {
  const { user, cart, clearCart, removeItemFromCart } = useContext(UserContext);
  console.log('cart page', user, cart);
  return (
    <Box>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <Box>
          {cart.map((item) => {
            return (
              <Card
                key={item.id}
                mb={10}
                p={3}
              >
                <Text as='h2'>{item.name}</Text>
                <Image
                  height={200}
                  width={200}
                  src={'http://localhost:3000' + item.image_url[0]}
                  alt={item.name}
                />
                <Text>{item.price}</Text>
                <Button onClick={() => removeItemFromCart(item)}>
                  Remove from Cart
                </Button>
              </Card>
            );
          })}
          <Button onClick={() => clearCart()}>Clear Cart</Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
