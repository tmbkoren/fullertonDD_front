import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Icon,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { LoaderFunctionArgs } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "~/util/userContext";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = params.productId;
  try {
    const data = await fetch(
      process.env.BACKEND_DEV_URL + "/api/products/getOne/" + productId
    );
    const item = await data.json();
    const itemImages = item.image_url.map((url: string) => {
      return url;
    });
    return { item, itemImages };
  } catch (error) {
    console.error(error);
    return { item: null, itemImages: [] };
  }
};

const ItemPage = () => {
  const { item, itemImages } = useLoaderData<typeof loader>();
  const { addItemToCart } = useContext(UserContext);
  const { colorMode } = useColorMode();

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <HStack
        spacing={8}
        align="start"
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Left side - Image */}
        <Box flex="1" maxW={{ base: "100%", md: "500px" }}>
          <Image
            src={itemImages[0]}
            alt={item.name}
            borderRadius="lg"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>

        {/* Right side - Product Details */}
        <VStack flex="1" align="start" spacing={4}>
          <Text fontSize="3xl" fontWeight="bold">
            {item.name}
          </Text>

          {/* Price and Rating */}
          <HStack justify="space-between" width="100%">
            <Text fontSize="2xl" fontWeight="semibold" color="blue.500">
              ${item.price}
            </Text>
            <HStack>
              {Array.from({ length: 4 }).map((_, i) => (
                <Icon key={i} as={FaStar} color="gold" />
              ))}
              {Array.from({ length: 5 - 4 }).map((_, i) => (
                <Icon key={i} as={FaRegStar} color="gold" />
              ))}
            </HStack>
          </HStack>

          {/* Stock Status */}
          <Badge
            colorScheme={item.stock_quantity > 0 ? "green" : "red"}
            fontSize="md"
            px={2}
            py={1}
          >
            {item.stock_quantity > 0
              ? `In Stock (${item.stock_quantity} available)`
              : "Out of Stock"}
          </Badge>

          {/* Action Buttons */}
          <HStack spacing={4} pt={4}>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => addItemToCart(item)}
              isDisabled={item.stock_quantity === 0}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="blue"
              isDisabled={item.stock_quantity === 0}
            >
              Buy Now
            </Button>
          </HStack>

          <Divider my={6} />

          {/* Detailed Information Tabs */}
          <Tabs width="100%" colorScheme="blue">
            <TabList>
              <Tab>Description</Tab>
              <Tab>Details</Tab>
              <Tab>Shipping</Tab>
            </TabList>

            <TabPanels>
              {/* Description Tab */}
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text
                    fontSize="lg"
                    color={colorMode === "light" ? "gray.700" : "gray.300"}
                  >
                    {item.description}
                  </Text>
                </VStack>
              </TabPanel>

              {/* Details Tab */}
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Product Details:</Text>
                  <Box>
                    <Text>• Category: {item.category_name}</Text>
                    <Text>• SKU: {item.id}</Text>
                    <Text>
                      • Added: {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                    <Text>
                      • Last Updated:{" "}
                      {new Date(item.updated_at).toLocaleDateString()}
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Shipping Tab */}
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Shipping Information:</Text>
                  <Box>
                    <Text>• Free shipping on orders over $50</Text>
                    <Text>• Standard delivery: 3-5 business days</Text>
                    <Text>• Express delivery: 1-2 business days</Text>
                    <Text>• Returns accepted within 30 days</Text>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ItemPage;
