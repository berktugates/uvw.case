import { SearchBarProps } from '@/types';
import { Input } from '../atoms/Input';

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Ara...',
  className = '',
}: SearchBarProps) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

