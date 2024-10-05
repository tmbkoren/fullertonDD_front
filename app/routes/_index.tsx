import { Box } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import ItemDisplayGrid from '~/components/ItemDisplayGrid';
import mockData from '../temp/mockData.json';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  console.log(mockData);
  return (
    <Box>
      <ItemDisplayGrid itemsToDisplay={mockData} />
    </Box>
  );
}
