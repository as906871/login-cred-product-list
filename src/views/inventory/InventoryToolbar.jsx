import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search, Add, ViewModule, ViewList, FilterList } from '@mui/icons-material';

const InventoryToolbar = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  onAddClick,
  itemCount,
}) => {
  const categories = ['', 'Electronics', 'Appliances', 'Clothing', 'Books', 'Sports', 'Home & Garden'];

  return (
    <Toolbar 
      sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: 2, 
        mb: 3,
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: { md: 1 } }}>
        Inventory ({itemCount} items)
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        alignItems: 'center',
        width: { xs: '100%', md: 'auto' },
      }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            // value={category}
            value={category || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            label="Category"
            startAdornment={<FilterList sx={{ mr: 1 }} />}
          >
            {categories.map((cat) => (
              <MenuItem key={cat || 'all'} value={cat}>
                {cat || 'All Categories'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && onViewModeChange(newMode)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddClick}
        >
          Add Item
        </Button>
      </Box>
    </Toolbar>
  );
};

export default InventoryToolbar