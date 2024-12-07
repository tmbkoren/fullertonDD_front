import type { MetaFunction } from '@vercel/remix';
import ItemDisplayGrid from '~/components/ItemDisplayGrid';
import { useLoaderData } from '@remix-run/react';
import { Product } from '~/util/types';
import HeroSection from '~/components/HeroSection';
import CategoryFeature from '~/components/CategoryFeature';

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
  const items = (await data.json()) as Product[];
  return { items };
}

export default function Index() {
  // using the loader data to display the items
  const { items } = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection />
      <CategoryFeature />
      <div id="item-display-grid">
        {items.length > 0 ? (
          <ItemDisplayGrid itemsToDisplay={items} />
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>
    </>
  );
}
