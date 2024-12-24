import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Menggunakan localStorage
import cartReducer from "../features/cart/cartSlice";

const persistConfig = {
  key: "root", // Nama key untuk menyimpan data
  storage, // Gunakan localStorage
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

// Membuat store dengan persistedReducer
const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

const persistor = persistStore(store); // Persistor untuk melacak penyimpanan

export { store, persistor };
