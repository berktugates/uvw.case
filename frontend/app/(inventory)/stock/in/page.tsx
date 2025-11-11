'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth.store';
import { useProductsStore } from '@/store/products.store';
import { stockApi } from '@/lib/api/stock.api';
import { PageLayout } from '@/components/templates/PageLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { ROUTES, MESSAGES } from '@/constants';
import { getNavigationItemsForRole, canAccessRoute } from '@/utils/navigation.utils';

export default function StockInPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated, logout } = useAuthStore();
  const { fetchProducts } = useProductsStore();
  const [productCode, setProductCode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  if (!canAccessRoute(ROUTES.STOCK_IN, user?.role)) {
    router.push(ROUTES.PRODUCTS);
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await stockApi.stockIn({ productCode, quantity });
      await fetchProducts();
      setProductCode('');
      setQuantity(0);
      toast.success(MESSAGES.STOCK.IN_SUCCESS);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || MESSAGES.STOCK.IN_FAILED;
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      user={user}
      onLogout={handleLogout}
      navigationItems={getNavigationItemsForRole(user?.role)}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stok Girişi (Stock-IN)</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="productCode"
              label="Ürün Kodu"
              value={productCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductCode(e.target.value)}
              placeholder="Ürün kodunu girin"
              required
            />

            <FormField
              id="quantity"
              label="Miktar"
              type="number"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 0)}
              placeholder="Giriş miktarını girin"
              required
              min={1}
            />

            <div>
              <Button type="submit" disabled={loading} variant="success" className="w-full">
                {loading ? MESSAGES.LOADING.PROCESSING : 'Stok Girişi Yap'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
