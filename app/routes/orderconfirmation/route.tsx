import {
  Box,
  Button,
  Text,
  useColorMode,
  VStack,
  HStack,
  Divider,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '~/util/userContext';

const OrderConfirmationPage = () => {
  const { cart, clearCart } = useContext(UserContext);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  // Constants for tax and shipping
  const TAX_PERCENTAGE = 0.07;
  const SHIPPING_FEE = 5.99;

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, { Product: item }) => {
      const price = parseFloat(item.price.toString());
      return isNaN(price) ? total : total + price;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * TAX_PERCENTAGE;
  const total = subtotal + tax + SHIPPING_FEE;

  // Handle order completion
  const handleCompleteOrder = () => {
    clearCart(); // Clear the cart after the order is confirmed
    navigate('/success'); // Redirect to the success page
  };

  const handleGoToHomePage = () => {
    navigate('/');
  };

  // Stepper setup
  const steps = [
    { title: 'Order Placed', description: 'We have received your order.' },
    { title: 'Order Processed', description: 'Your order is being processed.' },
    { title: 'Shipped', description: 'Your order has been shipped.' },
    {
      title: 'Out for Delivery',
      description: 'Your order is out for delivery.',
    },
    { title: 'Delivered', description: 'Your order has been delivered.' },
  ];

  const { activeStep } = useSteps({
    index: 0, // Starting step index
    count: steps.length,
  });

  return (
    <Box
      maxW='7xl'
      mx='auto'
      p={4}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
    >
      <VStack
        spacing={6}
        align='stretch'
      >
        <Text
          fontSize='3xl'
          fontWeight='bold'
          color={colorMode === 'light' ? 'gray.800' : 'white'}
        >
          Order Successful! Your order is on its way.
        </Text>

        {/* Stepper for Order Journey */}
        <Box
          p={6}
          shadow='lg'
          borderRadius='xl'
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
        >
          <Text
            fontSize='2xl'
            fontWeight='bold'
            mb={4}
            color={colorMode === 'light' ? 'gray.800' : 'white'}
          >
            Order Journey
          </Text>

          <Stepper
            index={activeStep}
            colorScheme='green'
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber>{index + 1}</StepNumber>}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Order Summary */}
        <Box
          p={6}
          shadow='lg'
          borderRadius='xl'
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
        >
          <Text
            fontSize='2xl'
            fontWeight='bold'
            mb={4}
            color={colorMode === 'light' ? 'gray.800' : 'white'}
          >
            Order Summary
          </Text>

          {cart.map(({ Product: item }) => (
            <HStack
              key={item.id}
              justify='space-between'
              mb={2}
            >
              <Text
                fontSize='lg'
                color={colorMode === 'light' ? 'gray.800' : 'white'}
              >
                {item.name}
              </Text>
              <Text
                fontSize='lg'
                fontWeight='bold'
                color={colorMode === 'light' ? 'gray.800' : 'white'}
              >
                ${parseFloat(item.price.toString()).toFixed(2)}
              </Text>
            </HStack>
          ))}

          <Divider my={4} />

          <HStack
            justify='space-between'
            mb={2}
          >
            <Text
              fontSize='lg'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              Subtotal:
            </Text>
            <Text
              fontSize='lg'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              ${subtotal.toFixed(2)}
            </Text>
          </HStack>

          <HStack
            justify='space-between'
            mb={2}
          >
            <Text
              fontSize='lg'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              Tax (7%):
            </Text>
            <Text
              fontSize='lg'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              ${tax.toFixed(2)}
            </Text>
          </HStack>

          <HStack
            justify='space-between'
            mb={2}
          >
            <Text
              fontSize='lg'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              Shipping Fee:
            </Text>
            <Text
              fontSize='lg'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              ${SHIPPING_FEE.toFixed(2)}
            </Text>
          </HStack>

          <HStack
            justify='space-between'
            mb={4}
          >
            <Text
              fontSize='xl'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              Total Amount:
            </Text>
            <Text
              fontSize='xl'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.800' : 'white'}
            >
              ${total.toFixed(2)}
            </Text>
          </HStack>

          {/* Action Buttons */}
          <VStack spacing={4}>
            <Button
              width='full'
              colorScheme='green'
              variant='solid'
              onClick={handleCompleteOrder}
            >
              Track My Order
            </Button>
            <Button
              width='full'
              colorScheme='blue'
              variant='solid'
              onClick={handleGoToHomePage}
            >
              Go to My Home Page
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrderConfirmationPage;
