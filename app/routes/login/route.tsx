// import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/cart',
  });
}

const LoginPage = () => {
  // State hooks to handle input values
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   // Check if entered credentials match the expected values
  //   if (username === 'username' && password === 'password') {
  //     alert('Login successful!'); // Success prompt
  //   } else {
  //     alert('Invalid username or password.'); // Error prompt
  //   }
  // };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='gray.100'
    >
      <Box
        bg='white'
        p={6}
        rounded='md'
        shadow='md'
        width='400px'
      >
        <Heading
          mb={6}
          textAlign='center'
          color='brand.500'
        >
          Login
        </Heading>
        <Form
          action='/auth/google'
          method='post'
        >
          <Button
            color={'black'}
            type='submit'
          >
            Login with Google
          </Button>
        </Form>
        {/* <VStack spacing={4}>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            bg="searchbar.background" 
                            color="black"
                            _focus={{ boxShadow: `0 0 0 2px brand.500` }}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} // Trigger login on Enter
                            bg="searchbar.background" 
                            color="black"
                            _focus={{ boxShadow: `0 0 0 2px brand.500` }}
                        />
                    </FormControl>
                    <Button 
                        bg="brand.500" 
                        color="white" 
                        width="full" 
                        mt={4} 
                        onClick={handleLogin} // Attach handleLogin function to button
                        _hover={{ bg: "brand.400" }} 
                        _active={{ bg: "brand.600" }}
                    >
                        Login
                    </Button>
                </VStack> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
