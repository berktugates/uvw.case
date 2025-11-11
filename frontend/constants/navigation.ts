import { ROUTES } from './routes';

export const NAVIGATION_ITEMS = [
  { label: 'Ürünler', href: ROUTES.PRODUCTS },
  { label: 'Stok Girişi', href: ROUTES.STOCK_IN },
  { label: 'Stok Çıkışı', href: ROUTES.STOCK_OUT },
  { label: 'Stok Hareketleri', href: ROUTES.STOCK_MOVEMENTS },
] as const;

