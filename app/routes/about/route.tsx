import React from 'react';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const AboutPage: React.FC = () => {
  const bg = useColorModeValue('gray.200', 'gray.800'); // Background for light/dark mode
  const color = useColorModeValue('black', 'white'); // Text color for light/dark mode
  const placeholderColor = useColorModeValue('gray.600', 'gray.300'); // Placeholder color

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={6}
      bg={bg}
      color={color}
      boxShadow="lg"
      rounded="md"
      mt={5}
    >
      <VStack spacing={4} align="flex-start">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          About Us
        </Text>

        <Text fontSize="lg">
          We at Fullerton Deal Depot are a sub-organization of the California State University of Fullerton, founded by local students of the University. Our mission is to bring a variety of high-quality school products to students, prospective students, and alumni alike at an affordable price.
        </Text>

        <Text fontSize="lg">
          We prioritize customer satisfaction above all else and can almost guarantee that better prices for our products cannot be found anywhere else.
        </Text>

        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Contact Us: 
        </Text>
        <Text fontSize="md" color={placeholderColor}>
          If you have any questions or want to learn more about us, feel free to reach out through our <a href="/contact">Contact Page</a>.
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutPage;
