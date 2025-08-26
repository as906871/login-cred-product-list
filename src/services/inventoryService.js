import { defaultItems } from "../utils/data";

function createInventoryService() {
  // const baseURL = "";

  let items = getInitialItems();

  function getInitialItems() {
    const stored = localStorage.getItem("inventoryItems");
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem("inventoryItems", JSON.stringify(defaultItems));
    return defaultItems;
  }

  const getItems = async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredItems = [...items];
        console.log("filteredItems", filteredItems);
        if (filters.search) {
          filteredItems = filteredItems.filter(
            (item) =>
              item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(filters.search.toLowerCase())
          );
        }

        if (filters.category) {
          filteredItems = filteredItems.filter(
            (item) => item.category === filters.category
          );
        }

        resolve(filteredItems);
      }, 300);
    });
  };

  const createItem = async (itemData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          ...itemData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        items.push(newItem);
        localStorage.setItem("inventoryItems", JSON.stringify(items));
        resolve(newItem);
      }, 500);
    });
  };

  const updateItem = async (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
          items[index] = { ...items[index], ...updates };
          localStorage.setItem("inventoryItems", JSON.stringify(items));
          resolve(items[index]);
        }
      }, 500);
    });
  };

  const deleteItem = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        items = items.filter((item) => item.id !== id);
        localStorage.setItem("inventoryItems", JSON.stringify(items));
        resolve(id);
      }, 500);
    });
  };

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
}

const inventoryService = createInventoryService();

export default inventoryService;
