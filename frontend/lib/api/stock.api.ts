import api from './axios';
import { StockInData, StockOutData, StockMovementsFilters, StockMovement } from '@/types';

export const stockApi = {
  stockIn: async (data: StockInData): Promise<StockMovement> => {
    const response = await api.post('/stock/in', data);
    return response.data;
  },

  stockOut: async (data: StockOutData): Promise<StockMovement> => {
    const response = await api.post('/stock/out', data);
    return response.data;
  },

  getMovements: async (filters?: StockMovementsFilters): Promise<StockMovement[]> => {
    const params = new URLSearchParams();
    if (filters?.productId) params.append('productId', filters.productId);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/stock/movements?${params.toString()}`);
    return response.data;
  },
};
