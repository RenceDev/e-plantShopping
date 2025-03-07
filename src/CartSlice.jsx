import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name); // Check if item exists
      if (existingItem) {
        existingItem.quantity++; // If item exists, increment its quantity
      } else {
        // Otherwise, add a new item with a quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // Remove item from the cart
    removeItem: (state, action) => {
      const { name } = action.payload; // Get item name from payload
      state.items = state.items.filter(item => item.name !== name); // Remove item by name
    },

    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Get item name and new quantity
      const itemToUpdate = state.items.find(item => item.name === name); // Find item by name
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update quantity
      }
    },
  },
});

// Export actions to be used in components (e.g., CartItem.jsx, ProductList.jsx)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be used in store.js
export default CartSlice.reducer;
