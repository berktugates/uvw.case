import { UserRole } from '@/types';

export const ROLES = {
  ADMIN: 'ADMIN' as UserRole,
  STOREKEEPER: 'STOREKEEPER' as UserRole,
  EMPLOYEE: 'EMPLOYEE' as UserRole,
} as const;

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Yönetici',
  [ROLES.STOREKEEPER]: 'Depo Yetkilisi',
  [ROLES.EMPLOYEE]: 'Çalışan',
} as const;

export const ROLE_OPTIONS = [
  { value: ROLES.EMPLOYEE, label: ROLE_LABELS[ROLES.EMPLOYEE] },
  { value: ROLES.STOREKEEPER, label: ROLE_LABELS[ROLES.STOREKEEPER] },
  { value: ROLES.ADMIN, label: ROLE_LABELS[ROLES.ADMIN] },
] as const;

export const CAN_EDIT_ROLES = [ROLES.ADMIN, ROLES.STOREKEEPER] as const;

export const CAN_ACCESS_STOCK_ROLES = [ROLES.ADMIN, ROLES.STOREKEEPER] as const;

