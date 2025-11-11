import { ProductListProps } from '@/types';
import { ProductCard } from '../molecules/ProductCard';
import { SearchBar } from '../molecules/SearchBar';

export const ProductList = ({
  products,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
  canEdit = false,
  loading = false,
}: ProductListProps) => {
  const filteredProducts = products.filter(
    (product) =>
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Ürün kodu, adı veya marka ile ara..."
        />
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              canEdit={canEdit}
            />
          ))}
        </ul>
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Ürün bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

