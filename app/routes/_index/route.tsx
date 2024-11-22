import { Box } from '@chakra-ui/react';
import type { MetaFunction } from '@vercel/remix';
import ItemDisplayGrid from '~/components/ItemDisplayGrid';
import { useLoaderData } from '@remix-run/react';
import { Product } from '~/util/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fullerton Deal Depot' },
    { name: 'description', content: 'Fullerton Deal Depot' },
  ];
};

export async function loader() {
  // fetching all products from the backend
  const data = await fetch(
    process.env.BACKEND_DEV_URL + '/api/products/getAll'
  );
  // parsing the response and returning it as an array of products
  const items = (await data.json()) as Product[];
  return { items };
}

export default function Index() {
  // using the loader data to display the items
  const { items } = useLoaderData<typeof loader>();
  return (
    <Box>
      <ItemDisplayGrid itemsToDisplay={items} />
    </Box>
  );
}
