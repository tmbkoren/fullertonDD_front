import { Grid } from '@chakra-ui/react';
import ItemDisplay from './ItemDisplay';

const ItemDisplayGrid = ({ itemsToDisplay }) => {
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
          key={item.itemId}
          itemId={item.itemId}
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          itemRating={item.itemRating}
          itemImage={item.itemImage}
        />
      ))}
    </Grid>
  );
};

export default ItemDisplayGrid;
