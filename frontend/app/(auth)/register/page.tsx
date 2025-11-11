'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/lib/api/auth.api';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { ROUTES, MESSAGES, ROLES, ROLE_OPTIONS } from '@/constants';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.EMPLOYEE);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.register({ email, password, role });
      if (response) {
        toast.success('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 2000);
      }
    } catch (err: any) {
      const statusCode = err.response?.status;
      const errorMessage = err.response?.data?.message || err.message || MESSAGES.AUTH.REGISTER_FAILED;
      
      const isEmailError = statusCode === 409 || 
                          errorMessage.includes('email') || 
                          errorMessage.includes('Email') || 
                          errorMessage.includes('already') || 
                          errorMessage.includes('registered') || 
                          errorMessage === 'This email is already registered';
      
      if (isEmailError) {
        toast.error('Bu email adresi zaten kullanılıyor!', {
          duration: 6000,
        });
      } else {
        toast.error(errorMessage, {
          duration: 6000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Yeni Hesap Oluştur" subtitle="Stok yönetim sistemine kayıt olun">
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
            minLength={6}
          />
          <FormField
            id="role"
            label="Rol"
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as typeof ROLES.EMPLOYEE)}
            options={ROLE_OPTIONS}
          />
        </div>
        <div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? MESSAGES.LOADING.REGISTERING : 'Kayıt Ol'}
          </Button>
        </div>
        <div className="text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Zaten hesabınız var mı? Giriş yapın
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
