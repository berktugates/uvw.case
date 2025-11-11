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

export default function StockOutPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated, logout } = useAuthStore();
  const { products, fetchProducts } = useProductsStore();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    if (hasHydrated && isAuthenticated) {
      fetchProducts();
    }
  }, [hasHydrated, isAuthenticated, router, fetchProducts]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  if (!canAccessRoute(ROUTES.STOCK_OUT, user?.role)) {
    router.push(ROUTES.PRODUCTS);
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const selectedProduct = products.find((p) => p.id === productId);
  const insufficientStock = selectedProduct && quantity > selectedProduct.currentStock;

  const productOptions = products.map((product) => ({
    value: product.id,
    label: `${product.name} - ${product.brand} (${product.productCode}) - Stok: ${product.currentStock}`,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (insufficientStock) {
      toast.error(`${MESSAGES.STOCK.INSUFFICIENT} ${selectedProduct?.currentStock}`, {
        duration: 6000,
      });
      return;
    }

    setLoading(true);

    try {
      await stockApi.stockOut({ productId, quantity });
      await fetchProducts();
      setProductId('');
      setQuantity(0);
      toast.success(MESSAGES.STOCK.OUT_SUCCESS);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || MESSAGES.STOCK.OUT_FAILED;
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stok Çıkışı (Stock-OUT)</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              id="productId"
              label="Ürün Seçin"
              value={productId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setProductId(e.target.value);
                const product = products.find((p) => p.id === e.target.value);
                if (product) {
                  setQuantity(Math.min(quantity, product.currentStock));
                }
              }}
              options={productOptions}
              placeholder="Ürün seçin..."
              required
            />

            {selectedProduct && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Mevcut Stok:</strong> {selectedProduct.currentStock}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Minimum Stok:</strong> {selectedProduct.minStock}
                </p>
              </div>
            )}

            <FormField
              id="quantity"
              label="Miktar"
              type="number"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 0)}
              placeholder="Çıkış miktarını girin"
              required
              min={1}
              max={selectedProduct?.currentStock}
            />

            <div>
              <Button
                type="submit"
                disabled={loading || insufficientStock}
                variant="danger"
                className="w-full"
              >
                {loading ? MESSAGES.LOADING.PROCESSING : 'Stok Çıkışı Yap'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
