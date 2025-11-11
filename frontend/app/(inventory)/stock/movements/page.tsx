'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useProductsStore } from '@/store/products.store';
import { stockApi } from '@/lib/api/stock.api';
import { StockMovement, StockMovementType } from '@/types';
import { PageLayout } from '@/components/templates/PageLayout';
import { StockMovementsTable } from '@/components/organisms/StockMovementsTable';
import { FormField } from '@/components/molecules/FormField';
import { ROUTES, MESSAGES } from '@/constants';
import { getNavigationItemsForRole, canAccessRoute } from '@/utils/navigation.utils';

export default function StockMovementsPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated, logout } = useAuthStore();
  const { products, fetchProducts } = useProductsStore();
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    productId: '',
    type: '' as '' | StockMovementType,
    startDate: '',
    endDate: '',
  });

  const loadMovements = async () => {
    setLoading(true);
    try {
      const data = await stockApi.getMovements({
        productId: filters.productId || undefined,
        type: filters.type || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      });
      setMovements(data);
    } catch (error: any) {
      alert(`${MESSAGES.STOCK.MOVEMENTS_LOAD_FAILED} ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    if (hasHydrated && isAuthenticated) {
      fetchProducts();
      loadMovements();
    }
  }, [hasHydrated, isAuthenticated, router, fetchProducts]);

  useEffect(() => {
    if (hasHydrated && isAuthenticated && canAccessRoute(ROUTES.STOCK_MOVEMENTS, user?.role)) {
      loadMovements();
    }
  }, [filters.productId, filters.type, filters.startDate, filters.endDate]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  if (!canAccessRoute(ROUTES.STOCK_MOVEMENTS, user?.role)) {
    router.push(ROUTES.PRODUCTS);
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const productOptions = products.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.productCode}`,
  }));

  const typeOptions = [
    { value: '', label: 'Tümü' },
    { value: 'IN', label: 'Giriş' },
    { value: 'OUT', label: 'Çıkış' },
  ];

  return (
    <PageLayout
      user={user}
      onLogout={handleLogout}
      navigationItems={getNavigationItemsForRole(user?.role)}
    >
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Stok Hareketleri</h2>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            id="productId"
            label="Ürün"
            value={filters.productId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, productId: e.target.value })}
            options={[{ value: '', label: 'Tümü' }, ...productOptions]}
          />

          <FormField
            id="type"
            label="Tür"
            value={filters.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, type: e.target.value as StockMovementType })}
            options={typeOptions}
          />

          <FormField
            id="startDate"
            label="Başlangıç Tarihi"
            type="date"
            value={filters.startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, startDate: e.target.value })}
          />

          <FormField
            id="endDate"
            label="Bitiş Tarihi"
            type="date"
            value={filters.endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>

        <StockMovementsTable movements={movements} loading={loading} />
      </div>
    </PageLayout>
  );
}
