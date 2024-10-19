import { Box } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
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
  const data = await fetch(
    process.env.BACKEND_DEV_URL + '/api/products/getAll'
  );
  const items = (await data.json()) as Product[];
  const images = items.map((item) => {
    return item.image_url.map((url) => {
      return process.env.BACKEND_DEV_URL + url;
    })
  })
  return {items, images};
}

export default function Index() {
  const {items, images} = useLoaderData<typeof loader>();
  return (
    <Box>
      <ItemDisplayGrid itemsToDisplay={items} images={images}/>
    </Box>
  );
}
