import { Button, Input, VStack, Box, FormControl, FormLabel, Text, useColorModeValue } from '@chakra-ui/react';
import { json, ActionFunctionArgs } from '@vercel/remix';
import { Form, redirect } from '@remix-run/react';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    console.log('formData: ', formData);

    // Use fetch without manually setting headers
    const response = await fetch(
      `${process.env.BACKEND_DEV_URL}api/products/upload`,
      {
        method: 'POST',
        body: formData, // Send formData directly
      }
    );

    if (!response.ok) {
      return json({ error: 'Failed to upload images' }, { status: 500 });
    }

    return redirect('/');
  } catch (error) {
    console.error('Fetch failed:', error);
    return json({ error: 'Failed to process the request' }, { status: 500 });
  }
};

const AddItemPage = () => {
  const bg = useColorModeValue('gray.200', 'gray.800'); // background for light/dark mode
  const color = useColorModeValue('black', 'white'); // text color for light/dark mode
  const placeholderColor = useColorModeValue('gray.600', 'gray.300'); // placeholder color
  const inputBg = useColorModeValue('white', 'gray.700'); // white input for light mode and dark gray for dark mode
  
  // this commented out code is for drag-and-drop file upload, which I decided to postpone for now, as it will take a while to implement
  // const formData = useActionData<typeof action>();
  // console.log('formData: ', typeof formData);

  // const [files, setFiles] = useState<File[]>([]);

  // useEffect(() => {
  //   console.log('files: ', files)
  // }, [files]);

  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  //   acceptedFiles.forEach((file) => {
  //     console.log(file);
  //     console.log(typeof file);
  //     setFiles(files => [...files, file]);
  //   });
  // }, []);
  //   const { getRootProps, getInputProps } = useDropzone({onDrop});


  return (
    <Form method="post" encType="multipart/form-data">
      <Box maxW="lg" mx="auto" p={6} bg={bg} color={color} boxShadow="lg" rounded="md" mt={5}>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="name">Product Name</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter product description"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              id="price"
              name="price"
              type="float"
              placeholder="Enter product price"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input
              id="category_name"
              name="category_name"  
              type="text"
              placeholder="Enter product category"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="stock_quantity">Initial Stock</FormLabel>
            <Input
              id="stock_quantity"
              name="stock_quantity"
              type="number"
              placeholder="Enter initial stock quantity"
              bg={inputBg} // Input background color
              _placeholder={{ color: placeholderColor }}
            />
          </FormControl>

          <FormControl>
            <Input
              visibility="hidden"
              type="hidden"
              name="available"
              value="TRUE"
            />
          </FormControl>

          {/* For the file upload */}
          <FormControl>
            <FormLabel htmlFor="images">Product Image</FormLabel>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
            />
            <Text fontSize="sm" color="gray.500" mt={1}>PNG, JPG, GIF up to 10MB</Text>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={3}
            isLoading={false} // You can set this to true if submitting
          >
            Add Product
          </Button>
        </VStack>
      </Box>
    </Form>
  );
};

export default AddItemPage;
