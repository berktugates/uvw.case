'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/lib/api/auth.api';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { ROUTES, MESSAGES } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      setAuth(response.user, response.accessToken);
      toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        router.push(ROUTES.PRODUCTS);
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || MESSAGES.AUTH.LOGIN_FAILED;
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Stok Yönetim Sistemi" subtitle="Hesabınıza giriş yapın">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            id="email"
            label="E-posta"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <FormField
            id="password"
            label="Şifre"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? MESSAGES.LOADING.LOGGING_IN : 'Giriş Yap'}
          </Button>
        </div>
        <div className="text-center">
          <a href="/register" className="text-sm text-blue-600 hover:text-blue-500">
            Hesabınız yok mu? Kayıt olun
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
