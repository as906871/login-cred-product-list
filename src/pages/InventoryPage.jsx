import { useState } from "react";
import useInventory from "../viewmodels/useInventory";
import { Alert, Box, Button, CircularProgress, Container, Snackbar, Typography } from "@mui/material";
import AppHeader from "../views/common/AppHeader";
import EmptyState from "../views/common/EmptyState";
import InventoryToolbar from "../views/inventory/InventoryToolbar";
import InventoryGrid from "../views/inventory/InventoryGrid";
import InventoryList from "../views/inventory/InventoryList";
import ItemDialog from "../views/inventory/ItemDialog";

const InventoryPage = ({ user, onLogout }) => {
  const {
    items,
    loading,
    error,
    filters,
    viewMode,
    createItem,
    updateItem,
    deleteItem,
    setFilters,
    setViewMode,
  } = useInventory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        setSnackbar({
          open: true,
          message: "Item deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete item",
          severity: "error",
        });
      }
    }
  };

  const handleSaveItem = async (itemData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, itemData);
        setSnackbar({
          open: true,
          message: "Item updated successfully",
          severity: "success",
        });
      } else {
        await createItem(itemData);
        setSnackbar({
          open: true,
          message: "Item added successfully",
          severity: "success",
        });
      }
      setDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to save item",
        severity: "error",
      });
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !filters.search ||
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      !filters.category || item.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  console.log("filteredItems", filteredItems)

  return (
    <Box sx={{ minHeight: "100%", bgcolor: "background.default" }}>
      <AppHeader user={user} onLogout={onLogout} />

      <Container maxWidth="xl">
        <InventoryToolbar
          searchTerm={filters.search}
          onSearchChange={(search) => setFilters({ search })}
          category={filters.category}
          onCategoryChange={(category) => setFilters({ category })}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddClick={handleAddItem}
          itemCount={filteredItems.length}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredItems.length === 0 ? (
          filters.search || filters.category ? (
            <Box sx={{ textAlign: "center", p: 4 }}>
              <Typography variant="h6" gutterBottom>
                No items match your search
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or add a new item.
              </Typography>
              <Button
                variant="contained"
                onClick={handleAddItem}
                sx={{ mt: 2 }}
              >
                Add Item
              </Button>
            </Box>
          ) : (
            <EmptyState onAddClick={handleAddItem} />
          )
        ) : viewMode === "grid" ? (
          <InventoryGrid
            items={filteredItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ) : (
          <InventoryList
            items={filteredItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}

        <ItemDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          item={editingItem}
          loading={loading}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default InventoryPage;
