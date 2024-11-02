import { Button, Input, VStack } from '@chakra-ui/react';
import { json, ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
// import { useDropzone } from 'react-dropzone';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    console.log('formData: ', formData);

    // Use fetch without manually setting headers
    // `${process.env.BACKEND_DEV_URL}
    const response = await fetch(
      `${process.env.BACKEND_DEV_URL}api/products/upload`,
      {
        method: 'POST',
        headers: {
          // "Content-Type": "multipart/form-data", // No need to set this
        },
        body: formData, // Send formData directly
      }
    );

    if (!response.ok) {
      return json({ error: 'Failed to upload images' }, { status: 500 });
    }

    const result = await response.json();
    return redirect('/');
  } catch (error) {
    console.error('Fetch failed:', error);
    return json({ error: 'Failed to process the request' }, { status: 500 });
  }
};

const AddItemPage = () => {
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
    <Form
      method='post'
      encType='multipart/form-data'
    >
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
          name='stock_quantity'
          placeholder='Initial Stock'
        />
        <Input
          visibility={'hidden'}
          type='hidden'
          name='available'
          value={'TRUE'}
        />
        {/* Following commented out code is for drag-and-drop file upload, which I decided to postpone for now, as it will take a while to implement*/}
        {/* <Input
          type='hidden'
          name='files'
          placeholder='Images'
          value={files}
        />
        <Box {...getRootProps()} border={'1px solid black'} p={10} cursor={'pointer'}>
          <p>Drag 'n' drop some files here, or click to select files</p>  
          <input
            name='images'
            {...getInputProps()}
          />
        </Box> */}
        <Input
          type='file'
          name='images'
        />
        <Button type='submit'>Add Item</Button>
      </VStack>
    </Form>
  );
};

export default AddItemPage;
