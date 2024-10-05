import { Box } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import ItemDisplayGrid from '~/components/ItemDisplayGrid';
import mockData from '../../temp/mockData.json';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fullerton Deal Depot' },
    { name: 'description', content: 'Fullerton Deal Depot' },
  ];
};

export default function Index() {
  return (
    <Box>
      <ItemDisplayGrid itemsToDisplay={mockData} />
    </Box>
  );
}
