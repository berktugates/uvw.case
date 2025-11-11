import { LabelProps } from '@/types/ui.types';

export const Label = ({
  htmlFor,
  children,
  required = false,
  className = '',
}: LabelProps) => {
  const baseStyles = 'block text-sm font-medium text-gray-700';

  return (
    <label htmlFor={htmlFor} className={`${baseStyles} ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

