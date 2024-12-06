import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { FcGoogle } from 'react-icons/fc';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/cart',
  });
}

const LoginPage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, gray.100, gray.200)',
    'linear(to-r, gray.700, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  height="100vh"
  bgGradient={bgGradient}
  px={4}
>
  <Box
    bg={cardBg}
    p={12}
    shadow="lg"
    width="100%"
    maxWidth="500px"
    textAlign="center"
  >
    <Heading as="h1" size="lg" mb={4} color={headingColor}>
      Welcome Back!
    </Heading>
    <Text fontSize="sm" color={textColor} mb={6}>
      Login to continue to your account
    </Text>

    <Form method="post">
      <Stack spacing={4} mb={6}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            focusBorderColor="blue.400"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            focusBorderColor="blue.400"
          />
        </FormControl>
      </Stack>
      <Button
        type="submit"
        width="full"
        bg="blue.500"
        color="white"
        _hover={{ bg: 'blue.400' }}
        _active={{ bg: 'blue.600' }}
        mb={4}
      >
        Login
      </Button>
    </Form>

    <Text fontSize="sm" color={textColor} mb={4}>
      Or
    </Text>

    <Form action="/auth/google" method="post">
      <Button
        type="submit"
        leftIcon={<FcGoogle />}
        width="full"
        variant="outline"
        colorScheme="gray"
      >
        Login with Google
      </Button>
    </Form>
  </Box>
</Box>
  );
};

export default LoginPage;
