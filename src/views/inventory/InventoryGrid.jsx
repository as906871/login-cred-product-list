import { Grid } from '@mui/material';
import InventoryCard from "./InventoryCard"

const InventoryGrid = ({ items, onEdit, onDelete }) => {
  return (
    <Grid container spacing={10}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <InventoryCard
            item={item} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default InventoryGrid