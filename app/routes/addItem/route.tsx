import { Button, Input, VStack } from '@chakra-ui/react';
import {
  json,
  NodeOnDiskFile,
  ActionFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { Form, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// export async function action({ request }: ActionFunctionArgs) {
//   // const formData = await unstable_parseMultipartFormData(
//   //   request,
//   //   unstable_composeUploadHandlers(
//   //     unstable_createFileUploadHandler({
//   //       // Limit file upload to images
//   //       filter({ contentType }) {
//   //         return contentType.includes('image');
//   //       },
//   //       // Store the images in the public/img folder
//   //       directory: './public/img',
//   //       // By default, `unstable_createFileUploadHandler` adds a number to the file
//   //       // names if there's another with the same name; by disabling it, we replace
//   //       // the old file
//   //       avoidFileConflicts: false,
//   //       // Use the actual filename as the final filename
//   //       file({ filename }) {
//   //         return filename;
//   //       },
//   //       // Limit the max size to 10MB
//   //       maxPartSize: 10 * 1024 * 1024,
//   //     }),
//   //     unstable_createMemoryUploadHandler()
//   //   )
//   // );
//   const formData = await request.formData();
//   console.log('formData: ', formData);
//   const name = formData.get('name') as string;
//   const description = formData.get('description') as string;
//   const price = formData.get('price') as string;
//   const category = formData.get('category') as string;
//   const stock = formData.get('stock') as string;
//   const files = formData.getAll('file') as NodeOnDiskFile[];
//   console.log('name: ', name);
//   console.log('description: ', description);
//   console.log('price: ', price);
//   console.log('category: ', category);
//   console.log('stock: ', stock);
//   console.log('files: ', files);
//   if (name && description && price && category && stock && files) {
//     console.log('all fields are filled');
//     console.log(name, description, price, category, stock, files);
//     const reqBody = {
//       name: name,
//       description: description,
//       price: price,
//       category: category,
//       stock: stock,
//       files: files,
//     };
//     console.log('reqBody: ', reqBody);
//     const newFormData = new FormData();
//     newFormData.append('name', name);
//     newFormData.append('description', description);
//     newFormData.append('price', price);
//     newFormData.append('category', category);
//     newFormData.append('stock', stock);
//     newFormData.append('files', files);
//     console.log('newFormData: ', newFormData);
//     fetch(`${process.env.BACKEND_DEV_URL}/api/products/upload`, {
//       method: 'POST',
//       body: formData,
//     })
//   }
//   return json({
//     files: files.map((file) => ({ name: file.name, url: `/img/${file.name}` })),
//   });
// }

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    // Use fetch without manually setting headers
    const response = await fetch(`${process.env.BACKEND_DEV_URL}api/products/upload`, {
      method: "POST",
      body: formData, // Send formData directly
    });

    if (!response.ok) {
      return json({ error: "Failed to upload images" }, { status: 500 });
    }

    const result = await response.json();
    return json(result);
  } catch (error) {
    console.error("Fetch failed:", error);
    return json({ error: "Failed to process the request" }, { status: 500 });
  }
};


function useFileUpload() {
  const { submit, data, state, formData } = useFetcher<typeof action>();
  const isUploading = state !== 'idle';

  const uploadingFiles = formData
    ?.getAll('file')
    ?.filter((value: unknown): value is File => value instanceof File)
    .map((file) => {
      const name = file.name;
      // This line is important; it will create an Object URL, which is a `blob:` URL string
      // We'll need this to render the image in the browser as it's being uploaded
      const url = URL.createObjectURL(file);
      return { name, url };
    });

  const images = (data?.files ?? []).concat(uploadingFiles ?? []);

  return {
    submit(files: FileList | null) {
      if (!files) return;
      const formData = new FormData();
      for (const file of files) formData.append('file', file);
      submit(formData, { method: 'POST', encType: 'multipart/form-data' });
    },
    isUploading,
    images,
  };
}

function PreviewImage({ name, url }: { name: string; url: string }) {
  // Here we store the object URL in a state to keep it between renders
  const [objectUrl] = useState(() => {
    if (url.startsWith('blob:')) return url;
    return undefined;
  });

  useEffect(() => {
    console.log('objectUrl: ', objectUrl);
    // If there's an objectUrl but the `url` is not a blob anymore, we revoke it
    if (objectUrl && !url.startsWith('blob:')) URL.revokeObjectURL(objectUrl);
  }, [objectUrl, url]);

  return (
    <img
      alt={name}
      src={url}
      width={320}
      height={240}
      style={{
        // Some styles; here we apply a blur filter when it's being uploaded
        transition: 'filter 300ms ease',
        filter: url.startsWith('blob:') ? 'blur(4px)' : 'blur(0)',
      }}
    />
  );
}

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
  const { submit, isUploading, images } = useFileUpload();

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
          name='stock'
          placeholder='Initial Stock'
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
        {/* <h1>Upload a file</h1>

        <label>
          {/* Here we use our boolean to change the label text 
          {isUploading ? <p>Uploading image...</p> : <p>Select an image</p>}

          <input
            name='file'
            type='file'
            // We hide the input so we can use our own label as a trigger
            style={{ display: 'none' }}
            onChange={(event) => submit(event.currentTarget.files)}
          />
        </label>

        <ul>
          {/*
           * Here we render the list of images, including the ones we're uploading
           * and the ones we've already uploaded
           *
          {images.map((file) => {
            return (
              <PreviewImage
                key={file.name}
                name={file.name}
                url={file.url}
              />
            );
          })}
        </ul> */}
        <Input type='file' name='file' />
        <Button type='submit'>Add Item</Button>
      </VStack>
    </Form>
  );
};

export default AddItemPage;
