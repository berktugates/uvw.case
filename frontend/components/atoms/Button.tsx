import { ButtonProps } from '@/types/ui.types';
import { BUTTON_VARIANT_STYLES } from '@/constants';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyle = BUTTON_VARIANT_STYLES[variant];
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

