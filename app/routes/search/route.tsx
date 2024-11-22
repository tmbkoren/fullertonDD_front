import { Box } from '@chakra-ui/react';
import { LoaderFunctionArgs } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import ItemDisplayGrid from '~/components/ItemDisplayGrid';
import { Product } from '~/util/types';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const nameQuery = url.searchParams.get('name') || '';

  const categoryQuery = url.searchParams.get('category') || '';
  const minPriceQuery = url.searchParams.get('minPrice') || '';
  const maxPriceQuery = url.searchParams.get('maxPrice') || '';
  const data = await fetch(
    `${process.env.BACKEND_DEV_URL}/api/products/search?name=${nameQuery}&category=${categoryQuery}&minPrice=${minPriceQuery}&maxPrice=${maxPriceQuery}`
  );

  if (data.status === 200) {
    const items = (await data.json()) as Product[];

    return { items, message: '' };
  } else {
    return { items: [], message: `No items found on the search request: ${nameQuery}` };
  }
}

const SearchPage = () => {
  const response = useLoaderData<typeof loader>();

  const { items, message } = response;

  return (
    <Box>
      {items.length > 0 ? (
        <ItemDisplayGrid itemsToDisplay={items} />
      ) : (
        <Box>{message}</Box>
      )}
    </Box>
  );
};

export default SearchPage;
