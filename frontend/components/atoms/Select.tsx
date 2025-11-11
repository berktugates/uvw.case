import { SelectProps } from '@/types/ui.types';

export const Select = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = '',
}: SelectProps) => {
  const baseStyles = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${baseStyles} ${className}`}
    >
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

