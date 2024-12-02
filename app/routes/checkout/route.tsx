import {
  Box,
  Button,
  Text,
  useColorMode,
  VStack,
  HStack,
  Input,
  Divider,
  Select,
  RadioGroup,
  Radio,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "~/util/userContext";

const CheckoutPage = () => {
  const { cart } = useContext(UserContext);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.toString());
      return isNaN(price) ? total : total + price;
    }, 0);
  };

  const getShippingPrice = (method: string) => {
    switch (method) {
      case "standard":
        return 5.99;
      case "express":
        return 15.99;
      case "overnight":
        return 25.99;
      default:
        return 0;
    }
  };

  const shippingPrice = getShippingPrice(shippingMethod);
  const totalAmount = calculateTotal() + shippingPrice;

  return (
    <Box
      maxW="7xl"
      mx="auto"
      p={4}
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
    >
      <HStack spacing={8} align="stretch">
        {/* Left Column (Shipping Information, Shipping Method, Payment Method) */}
        <VStack spacing={6} align="stretch" width="60%">
          {/* Shipping Information */}
          <Box
            p={6}
            shadow="lg"
            borderRadius="xl"
            bg={colorMode === "light" ? "white" : "gray.700"}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              Shipping Information
            </Text>
            <VStack spacing={4} align="stretch">
              <Input placeholder="Full Name" size="lg" />
              <Input placeholder="Address Line 1" size="lg" />
              <Input placeholder="Address Line 2 (Optional)" size="lg" />
              <HStack spacing={4}>
                <Input placeholder="City" size="lg" />
                <Input placeholder="ZIP Code" size="lg" />
              </HStack>
              <Select placeholder="Select Country">
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </VStack>
          </Box>

          {/* Payment Method */}
          <Box
            p={6}
            shadow="lg"
            borderRadius="xl"
            bg={colorMode === "light" ? "white" : "gray.700"}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              Payment Method
            </Text>
            <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
              <Stack direction="column">
                <Radio value="credit-card">Credit Card</Radio>
                <Radio value="paypal">PayPal</Radio>
                <Radio value="apple-pay">Apple Pay</Radio>
              </Stack>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <VStack spacing={4} mt={4} align="stretch">
                <Input
                  placeholder="Credit Card Number"
                  size="lg"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <HStack spacing={4}>
                  <Input
                    placeholder="MM/YY Expiry"
                    size="lg"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                  <Input
                    placeholder="CVV"
                    size="lg"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                  />
                </HStack>
              </VStack>
            )}
          </Box>

          {/* Shipping Method */}
          <Box
            p={6}
            shadow="lg"
            borderRadius="xl"
            bg={colorMode === "light" ? "white" : "gray.700"}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              Shipping Method
            </Text>
            <RadioGroup onChange={setShippingMethod} value={shippingMethod}>
              <Stack direction="column">
                <Radio value="standard">Standard Shipping ($5.99)</Radio>
                <Radio value="express">Express Shipping ($15.99)</Radio>
                <Radio value="overnight">Overnight Shipping ($25.99)</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>

        {/* Right Column (Order Summary and Place Order Button) */}
        <VStack spacing={6} align="stretch" width="40%">
          {/* Order Summary */}
          <Box
            p={8}
            shadow="lg"
            borderRadius="xl"
            bg={colorMode === "light" ? "white" : "gray.700"}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              Order Summary
            </Text>

            <HStack justify="space-between" mb={4}>
              <Text fontSize="lg" color={colorMode === "light" ? "gray.800" : "white"}>
                Total Items:
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "gray.800" : "white"}>
                {cart.length}
              </Text>
            </HStack>

            <HStack justify="space-between" mb={4}>
              <Text fontSize="lg" color={colorMode === "light" ? "gray.800" : "white"}>
                Subtotal:
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "gray.800" : "white"}>
                ${calculateTotal().toFixed(2)}
              </Text>
            </HStack>

            <HStack justify="space-between" mb={6}>
              <Text fontSize="lg" color={colorMode === "light" ? "gray.800" : "white"}>
                Shipping:
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "gray.800" : "white"}>
                ${shippingPrice.toFixed(2)}
              </Text>
            </HStack>

            <Divider />

            <HStack justify="space-between" mt={4}>
              <Text fontSize="xl" fontWeight="bold" color={colorMode === "light" ? "gray.800" : "white"}>
                Total Amount:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={colorMode === "light" ? "gray.800" : "white"}>
                ${totalAmount.toFixed(2)}
              </Text>
            </HStack>

            {/* Scrollable Product Images */}
            <Box
              overflowY="auto"
              maxH="400px"  // Adjust the height as needed
              mb={6}  // Margin added here to separate images from the button
              pb={2}
            >
              <VStack spacing={4}>
                {cart.map((item) => (
                  <Box key={item.id}>
                    <Image
                      src={item.image_url[0]}
                      alt={item.name}
                      boxSize="150px"  // Enlarged image size
                      objectFit="cover"
                      borderRadius="lg"
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                    <Divider mt={2} /> {/* Divider between product images */}
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Place Order Button */}
            <Button
              width="100%"
              colorScheme="blue"
              variant="solid"
              onClick={() => navigate("/orderconfirmation")}
              _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              Place Order
            </Button>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CheckoutPage;
