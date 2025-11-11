'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useProductsStore } from '@/store/products.store';
import { productsApi } from '@/lib/api/products.api';
import { Product, CreateProductData } from '@/types';
import { PageLayout } from '@/components/templates/PageLayout';
import { ProductList } from '@/components/organisms/ProductList';
import { ProductForm } from '@/components/organisms/ProductForm';
import { Modal } from '@/components/molecules/Modal';
import { ConfirmationModal } from '@/components/molecules/ConfirmationModal';
import { Button } from '@/components/atoms/Button';
import { ROUTES, MESSAGES, CAN_EDIT_ROLES } from '@/constants';
import { getNavigationItemsForRole } from '@/utils/navigation.utils';

export default function ProductsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, hasHydrated } = useAuthStore();
  const { products, loading, fetchProducts } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<CreateProductData>({
    productCode: '',
    name: '',
    brand: '',
    minStock: 0,
  });

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    if (hasHydrated && isAuthenticated) {
      fetchProducts();
    }
  }, [hasHydrated, isAuthenticated, router, fetchProducts]);

  const canEdit = user?.role && CAN_EDIT_ROLES.includes(user.role as any);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productsApi.create(formData);
      await fetchProducts();
      setShowCreateModal(false);
      setFormData({ productCode: '', name: '', brand: '', minStock: 0 });
    } catch (error: any) {
      alert(error.response?.data?.message || MESSAGES.PRODUCT.CREATE_FAILED);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await productsApi.update(editingProduct.id, formData);
      await fetchProducts();
      setEditingProduct(null);
      setFormData({ productCode: '', name: '', brand: '', minStock: 0 });
    } catch (error: any) {
      alert(error.response?.data?.message || MESSAGES.PRODUCT.UPDATE_FAILED);
    }
  };

  const handleDeleteClick = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setDeletingProduct(product);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    try {
      await productsApi.delete(deletingProduct.id);
      setDeletingProduct(null);
      await fetchProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || MESSAGES.PRODUCT.DELETE_FAILED);
      setDeletingProduct(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productCode: product.productCode,
      name: product.name,
      brand: product.brand,
      minStock: product.minStock,
    });
  };

  const resetForm = () => {
    setFormData({ productCode: '', name: '', brand: '', minStock: 0 });
    setEditingProduct(null);
    setShowCreateModal(false);
  };

  if (!hasHydrated || !isAuthenticated) return null;

  return (
    <PageLayout
      user={user}
      onLogout={handleLogout}
      navigationItems={getNavigationItemsForRole(user?.role)}
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ürünler</h2>
        {canEdit && (
          <Button onClick={() => setShowCreateModal(true)}>
            Yeni Ürün Ekle
          </Button>
        )}
      </div>

      <ProductList
        products={products}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEdit={canEdit ? openEditModal : undefined}
        onDelete={canEdit ? handleDeleteClick : undefined}
        canEdit={canEdit}
        loading={loading}
      />

      <Modal
        isOpen={showCreateModal}
        onClose={resetForm}
        title="Yeni Ürün Ekle"
      >
        <ProductForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleCreate}
          onCancel={resetForm}
        />
      </Modal>

      <Modal
        isOpen={!!editingProduct}
        onClose={resetForm}
        title="Ürünü Düzenle"
      >
        <ProductForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleUpdate}
          onCancel={resetForm}
          submitLabel="Güncelle"
        />
      </Modal>

      <ConfirmationModal
        isOpen={!!deletingProduct}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Ürünü Sil"
        message={deletingProduct ? `${deletingProduct.name} ürününü silmek istediğinizden emin misiniz?` : ''}
        confirmLabel="Sil"
        cancelLabel="İptal"
        confirmVariant="danger"
      />
    </PageLayout>
  );
}
