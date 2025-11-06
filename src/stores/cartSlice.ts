import { CartI } from "../interface/CartInterface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateI {
  carts: CartI[];
}

const initialState: InitialStateI = {
  carts: [], // Selalu array, bukan null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Tambah atau update product di cart
     */
    updateCart: (state, action: PayloadAction<CartI>) => {
      const product = action.payload;
      if (!product || typeof product.id === "undefined") return;

      // Pastikan carts selalu array (safety jika rehydrate dari state lama)
      if (!Array.isArray(state.carts)) {
        state.carts = [];
      }

      const incomingQuantity =
        typeof product.quantity === "number" ? product.quantity : 1;
      const incomingPrice =
        typeof product.price === "number" ? product.price : 0;

      const existingIndex = state.carts.findIndex((c) => c.id === product.id);

      if (existingIndex !== -1) {
        // Update langsung quantity dari payload, JANGAN dijumlahkan lagi
        const existing = state.carts[existingIndex];

        state.carts[existingIndex] = {
          ...existing,
          ...product, // ambil semua data terbaru dari payload
          quantity: product.quantity, // pakai quantity yang dikirim
          totalPrice: Number(existing.price) * product.quantity,
        };
      } else {
        // Tambahkan item baru ke cart
        const newCartItem: CartI = {
          id: product.id,
          name: product.name ?? "",
          description: product.description,
          price: incomingPrice,
          category_id: product.category_id ?? 0,
          limited_stock: product.limited_stock ?? false,
          slug: product.slug,
          category: product.category,
          stock: product.stock,
          origin: product.origin,
          abv: product.abv,
          volume: product.volume,
          thumbnail: product.thumbnail,
          measurement: product.measurement,
          productImages: product.productImages ?? product.product_images ?? [],
          product_images: product.product_images ?? product.productImages ?? [],
          quantity: incomingQuantity,
          totalPrice: incomingPrice * incomingQuantity,
        };

        state.carts.push(newCartItem);
      }
    },

    /**
     * Hapus product berdasarkan productId
     */
    deleteProductFromCart: (
      state,
      action: PayloadAction<{ productId: number }>
    ) => {
      if (!Array.isArray(state.carts)) {
        state.carts = [];
        return;
      }

      const { productId } = action.payload;
      state.carts = state.carts.filter((c) => c.id !== productId);
    },

    /**
     * Hapus semua produk di cart
     */
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { updateCart, deleteProductFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
