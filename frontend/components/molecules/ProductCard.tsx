import { ProductCardProps } from '@/types';
import { Button } from '../atoms/Button';

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
  canEdit = false,
}: ProductCardProps) => {
  const isLowStock = product.currentStock < product.minStock;

  return (
    <li className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-900">
              {product.name} - {product.brand}
            </p>
            <span className="ml-2 text-xs text-gray-500">
              ({product.productCode})
            </span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>Mevcut Stok: {product.currentStock}</span>
            <span className="ml-4">Min Stok: {product.minStock}</span>
            {isLowStock && (
              <span className="ml-4 text-red-600 font-semibold">
                Düşük Stok!
              </span>
            )}
          </div>
        </div>
        {canEdit && (
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="secondary"
                onClick={() => onEdit(product)}
                className="px-3 py-1 text-sm"
              >
                Düzenle
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                onClick={() => onDelete(product.id)}
                className="px-3 py-1 text-sm"
              >
                Sil
              </Button>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

