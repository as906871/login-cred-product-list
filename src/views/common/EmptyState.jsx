import { Box, Typography, Button } from '@mui/material';
import { Inventory, Add } from '@mui/icons-material';

const EmptyState = ({ onAddClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        textAlign: 'center',
        p: 3,
      }}
    >
      <Inventory sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        No items in inventory
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        Your inventory is empty. Start by adding your first item to keep track of your products.
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onAddClick}>
        Add Your First Item
      </Button>
    </Box>
  );
};

export default EmptyState