import { UserRole } from '@/types';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

export interface NavigationItem {
  label: string;
  href: string;
  allowedRoles: UserRole[];
}

export const ALL_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Ürünler',
    href: ROUTES.PRODUCTS,
    allowedRoles: [ROLES.ADMIN, ROLES.STOREKEEPER, ROLES.EMPLOYEE],
  },
  {
    label: 'Stok Girişi',
    href: ROUTES.STOCK_IN,
    allowedRoles: [ROLES.ADMIN, ROLES.STOREKEEPER],
  },
  {
    label: 'Stok Çıkışı',
    href: ROUTES.STOCK_OUT,
    allowedRoles: [ROLES.ADMIN, ROLES.STOREKEEPER],
  },
  {
    label: 'Stok Hareketleri',
    href: ROUTES.STOCK_MOVEMENTS,
    allowedRoles: [ROLES.ADMIN, ROLES.STOREKEEPER],
  },
];

export const getNavigationItemsForRole = (role: UserRole | null | undefined): Array<{ label: string; href: string }> => {
  if (!role) {
    return [];
  }

  return ALL_NAVIGATION_ITEMS
    .filter((item) => item.allowedRoles.includes(role))
    .map(({ label, href }) => ({ label, href }));
};

export const canAccessRoute = (route: string, role: UserRole | null | undefined): boolean => {
  if (!role) {
    return false;
  }

  const item = ALL_NAVIGATION_ITEMS.find((item) => item.href === route);
  if (!item) {
    return false;
  }

  return item.allowedRoles.includes(role);
};

