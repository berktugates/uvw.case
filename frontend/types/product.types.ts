import { FormEvent } from 'react';

export interface Product {
  id: string;
  productCode: string;
  name: string;
  brand: string;
  minStock: number;
  currentStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  productCode: string;
  name: string;
  brand: string;
  minStock: number;
}

export interface UpdateProductData {
  productCode?: string;
  name?: string;
  brand?: string;
  minStock?: number;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  removeProduct: (id: string) => void;
}

export interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
}

export interface ProductFormProps {
  formData: CreateProductData;
  onChange: (data: CreateProductData) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
  error?: string;
}

export interface ProductListProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  loading?: boolean;
}

