import api from './axios';
import { Product, CreateProductData, UpdateProductData } from '@/types';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: CreateProductData): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: UpdateProductData): Promise<Product> => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
