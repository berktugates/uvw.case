import { AlertProps } from '@/types';
import { ALERT_STYLES } from '@/constants';

export const Alert = ({
  type = 'info',
  children,
  className = '',
}: AlertProps) => {
  const baseStyles = 'border px-4 py-3 rounded';
  const typeStyle = ALERT_STYLES[type];

  return (
    <div className={`${baseStyles} ${typeStyle} ${className}`}>
      {children}
    </div>
  );
};

