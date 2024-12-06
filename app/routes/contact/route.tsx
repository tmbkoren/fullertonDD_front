import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';

const ContactPage: React.FC = () => {
  const bg = useColorModeValue('gray.200', 'gray.800'); // Background for light/dark mode
  const color = useColorModeValue('black', 'white'); // Text color for light/dark mode
  const placeholderColor = useColorModeValue('gray.600', 'gray.300'); // Placeholder color
  const inputBg = useColorModeValue('white', 'gray.700'); // Input background for light/dark mode

  return (
    <Form method="post">
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
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
            Contact Us
          </Text>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="message">Your Message</FormLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
              resize="vertical"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={3}
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </Form>
  );
};

export default ContactPage;
