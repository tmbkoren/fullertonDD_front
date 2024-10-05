import { Grid } from '@chakra-ui/react';
import ItemDisplay from './ItemDisplay';

const ItemDisplayGrid = ({ itemsToDisplay }) => {
  console.log(itemsToDisplay);
  return (
    <Grid
      templateColumns={{
        sm: 'repeat(2, minmax(100px, 1fr))',
        md: 'repeat(2, minmax(200px, 1fr))',
        lg: 'repeat(3, minmax(200px, 1fr))',
        xl: 'repeat(4, minmax(300px, 1fr))',
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
