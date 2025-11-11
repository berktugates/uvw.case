import { Button } from '../atoms/Button';
import { ConfirmationModalProps } from '@/types';

export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Onay',
  message,
  confirmLabel = 'Onayla',
  cancelLabel = 'İptal',
  confirmVariant = 'danger',
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

