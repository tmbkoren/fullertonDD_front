import { Box, Grid } from '@chakra-ui/react';
import ItemDisplay from './ItemDisplay';
import { Product } from '~/util/types';

interface ItemDisplayGridProps {
  itemsToDisplay: Product[];
  images: string[][];
}

const ItemDisplayGrid: React.FC<ItemDisplayGridProps> = ({
  itemsToDisplay,
}) => {
  console.log('itemsToDisplay', itemsToDisplay);
  return (
    <Grid
      templateColumns={{
        sm: 'repeat(2, minmax(150px, 1fr))',
        md: 'repeat(3, minmax(150px, 1fr))',
        lg: 'repeat(5, minmax(150px, 1fr))',
        xl: 'repeat(6, minmax(150px, 1fr))',
      }}
      p={{
        base: 1,
        md: 10,
      }}
      gap={7}
    >
      {itemsToDisplay.map((item) => (
        <ItemDisplay
          key={item.id}
          item={item}
        />
      ))}
    </Grid>
  );
};

export default ItemDisplayGrid;
