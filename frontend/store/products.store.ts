import { create } from 'zustand';
import { productsApi } from '@/lib/api/products.api';
import { ProductsState, Product } from '@/types';

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await productsApi.getAll();
      set({ products, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addProduct: (product: Product) => {
    set((state) => ({ products: [product, ...state.products] }));
  },
  updateProduct: (id: string, updatedProduct: Product) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
    }));
  },
  removeProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
