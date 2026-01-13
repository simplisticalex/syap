import { createSlice } from "@reduxjs/toolkit";

function loadCart() {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(x => x && typeof x.id === "number" && typeof x.qty === "number")
      .map(x => ({ id: x.id, qty: x.qty }));
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart() 
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload; 
      const existing = state.items.find(i => i.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ id: product.id, qty: 1 });
      }
    },
    incQty(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.qty += 1;
    },
    decQty(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.qty -= 1;

      state.items = state.items.filter(i => i.qty > 0);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, incQty, decQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
