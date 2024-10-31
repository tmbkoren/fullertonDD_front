import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { ActionFunctionArgs, unstable_parseMultipartFormData } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export async function action({ request }: ActionFunctionArgs) {
  // const data = await unstable_parseMultipartFormData(request);
  const data = await request.formData();
  const name = data.get('name');
  const description = data.get('description');
  const price = data.get('price');
  const category = data.get('category');
  const stock = data.get('stock');
  const imageAmount = data.get('imageAmount');
  const images = [];
  for (let i = 0; i < imageAmount; i++) {
    const image = data.get(`image${i}`);
    console.log('tarkov', image, typeof image);
    images.push(image);
  }
  console.log(data);
  console.log(name);
  console.log(description);
  console.log(price);
  console.log(category);
  console.log(stock);
  console.log(imageAmount);
  console.log(images);

  return images;
}

const AddItemPage = () => {
  const [imgAmount, setImgAmount] = useState(1);
  const formData = useActionData<typeof action>();
  const { getRootProps, getInputProps } = useDropzone();
  console.log(typeof formData);
  formData?.forEach((img) => console.log(typeof img));

  return (
    <Form method='post'>
      {formData && formData.map((img) => <img src={img} />)}
      <VStack>
        <Input
          type='text'
          name='name'
          placeholder='Name'
        />
        <Input
          type='text'
          name='description'
          placeholder='Description'
        />
        <Input
          type='float'
          name='price'
          placeholder='Price'
        />
        <Input
          type='text'
          name='category'
          placeholder='Category'
        />
        <Input
          type='text'
          name='stock'
          placeholder='Initial Stock'
        />
        <Input
          type='hidden'
          name='imageAmount'
          value={imgAmount}
          readOnly
        />
        <Box {...getRootProps()} border={'1px solid black'}>
          <p>Drag 'n' drop some files here, or click to select files</p>  
          <input
            name='images'
            {...getInputProps()}
          />
        </Box>
        <Button onClick={() => setImgAmount(imgAmount + 1)}>Add Image</Button>
        <Button type='submit'>Add Item</Button>
      </VStack>
    </Form>
  );
};

export default AddItemPage;
