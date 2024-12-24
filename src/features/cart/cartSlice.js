import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Daftar item di cart
  totalUniqueItems: 0, // Total jumlah produk unik di cart
  totalQuantity: 0, // Total jumlah item
  totalPrice: 0, // Total harga
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Tambah item ke cart
    addItemToCart: (state, action) => {
      const { id, image, product_name, size, delivery, price, quantity } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += price * quantity;
        existingItem.totalUniqueItems = 1;
      } else {
        state.items.push({
          id,
          image,
          product_name,
          size,
          delivery,
          price,
          quantity,
          totalPrice: price * quantity,
        });
        // Tambahkan produk unik ke total unik
        state.totalUniqueItems += 1;
      }
      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload; // Pastikan `id` diterima dari action
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Kurangi jumlah total kuantitas dan harga
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        // Hapus item dari daftar
        state.items = state.items.filter((item) => item.id !== id);

        // Kurangi total produk unik hanya jika item dihapus
        state.totalUniqueItems -= 1;
      }
    },

    // Tambah reducer increment dan decrement
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },

    // Reset cart
    resetCart: (state) => {
      state.items = [];
      state.totalUniqueItems = 0;
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
