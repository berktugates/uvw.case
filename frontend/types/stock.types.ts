import { Product } from './product.types';
import { User } from './auth.types';

export type StockMovementType = 'IN' | 'OUT';

export interface StockMovement {
  id: string;
  productId: string;
  product: Pick<Product, 'id' | 'productCode' | 'name' | 'brand'>;
  type: StockMovementType;
  quantity: number;
  prevStock: number;
  newStock: number;
  createdBy: string;
  user: Pick<User, 'id' | 'email' | 'role'>;
  createdAt: string;
}

export interface StockInData {
  productCode: string;
  quantity: number;
}

export interface StockOutData {
  productId: string;
  quantity: number;
}

export interface StockMovementsFilters {
  productId?: string;
  type?: StockMovementType;
  startDate?: string;
  endDate?: string;
}

export interface StockMovementsTableProps {
  movements: StockMovement[];
  loading?: boolean;
}

