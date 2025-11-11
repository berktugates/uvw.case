import { CreateProductData, ProductFormProps } from '@/types';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export const ProductForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Kaydet',
  error,
}: ProductFormProps) => {
  const handleFieldChange = (field: keyof CreateProductData, value: string | number) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <FormField
        id="productCode"
        label="Ürün Kodu"
        value={formData.productCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('productCode', e.target.value)}
        required
      />
      <FormField
        id="name"
        label="Ürün Adı"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('name', e.target.value)}
        required
      />
      <FormField
        id="brand"
        label="Marka"
        value={formData.brand}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('brand', e.target.value)}
        required
      />
      <FormField
        id="minStock"
        label="Minimum Stok"
        type="number"
        value={formData.minStock}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('minStock', parseInt(e.target.value) || 0)}
        required
        min={0}
      />
      <div className="flex justify-end space-x-2 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

