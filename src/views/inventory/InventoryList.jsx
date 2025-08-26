import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import { MoreVert, Edit, Delete, Inventory } from "@mui/icons-material";
import { useState } from "react";

const InventoryList = ({ items, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    onEdit(selectedItem);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(selectedItem.id);
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 56, height: 56 }}
                    variant="rounded"
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={item.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={item.quantity}
                  size="small"
                  color={item.quantity > 10 ? "success" : "warning"}
                  icon={<Inventory />}
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                  ${item.price}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={(e) => handleMenuClick(e, item)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default InventoryList;
