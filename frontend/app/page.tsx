'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    
    if (isAuthenticated) {
      router.push(ROUTES.PRODUCTS);
    } else {
      router.push(ROUTES.LOGIN);
    }
  }, [hasHydrated, isAuthenticated, router]);

  return null;
}
