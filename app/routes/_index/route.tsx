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

interface LoaderData {
  items: Product[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const data = await fetch(
      process.env.BACKEND_DEV_URL + '/api/products/getAll'
    );
    if (!data.ok) {
      throw new Error('Failed to fetch products');
    }
    const items = (await data.json()) as Product[];
    return { items };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { items: [] };  // Empty array as fallback
  }
}

export default function Index() {
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
