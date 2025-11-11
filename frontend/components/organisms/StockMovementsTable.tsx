import { StockMovementsTableProps } from '@/types';

export const StockMovementsTable = ({
  movements,
  loading = false,
}: StockMovementsTableProps) => {
  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ürün
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tür
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Miktar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Önceki Stok
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yeni Stok
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemi Yapan
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movements.map((movement) => (
            <tr key={movement.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(movement.createdAt).toLocaleString('tr-TR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {movement.product.name} ({movement.product.productCode})
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    movement.type === 'IN'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {movement.type === 'IN' ? 'GİRİŞ' : 'ÇIKIŞ'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {movement.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {movement.prevStock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {movement.newStock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {movement.user.email} ({movement.user.role})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {movements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Henüz stok hareketi bulunmamaktadır.
        </div>
      )}
    </div>
  );
};

