import { InputProps } from '@/types/ui.types';

export const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  minLength,
  className = '',
}: InputProps) => {
  const baseStyles = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      minLength={minLength}
      className={`${baseStyles} ${className}`}
    />
  );
};

