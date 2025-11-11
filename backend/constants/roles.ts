import { Role } from '@prisma/client';

export const ROLES = {
  ADMIN: Role.ADMIN,
  STOREKEEPER: Role.STOREKEEPER,
  EMPLOYEE: Role.EMPLOYEE,
} as const;

export const CAN_EDIT_ROLES = [Role.ADMIN, Role.STOREKEEPER] as const;

export const CAN_ACCESS_STOCK_ROLES = [Role.ADMIN, Role.STOREKEEPER] as const;

