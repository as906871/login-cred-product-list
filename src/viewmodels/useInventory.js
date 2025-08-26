import { useEffect, useState } from "react";
import inventoryService from "../services/inventoryService"

const useInventory = () => {
  const [state, setState] = useState({
    items: [],
    loading: false,
    error: null,
    filters: { search: '', category: '' },
    viewMode: 'grid', 
  });

  const fetchItems = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const items = await inventoryService.getItems(state.filters);
      setState(prev => ({ ...prev, items, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const createItem = async (itemData) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const newItem = await inventoryService.createItem(itemData);
      setState(prev => ({ 
        ...prev, 
        items: [...prev.items, newItem], 
        loading: false 
      }));
      return newItem;
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const updateItem = async (id, updates) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const updatedItem = await inventoryService.updateItem(id, updates);
      setState(prev => ({
        ...prev,
        items: prev.items.map(item => item.id === id ? updatedItem : item),
        loading: false
      }));
      return updatedItem;
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const deleteItem = async (id) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await inventoryService.deleteItem(id);
      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id),
        loading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      throw error;
    }
  };

  const setFilters = (filters) => {
    setState(prev => ({ ...prev, filters: { ...prev.filters, ...filters } }));
  };

  const setViewMode = (mode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  };

  useEffect(() => {
    fetchItems();
  }, [state.filters]);

  return {
    ...state,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    setFilters,
    setViewMode,
  };
};

export default useInventory