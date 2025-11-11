import { HeaderProps } from '@/types';
import { Button } from '../atoms/Button';

export const Header = ({
  user,
  onLogout,
  navigationItems = [],
}: HeaderProps) => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">
              Stok Yönetim Sistemi
            </h1>
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-blue-600 hover:text-blue-800"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-700">
                  {user.email}
                </span>
                <Button variant="danger" onClick={onLogout} className="text-sm">
                  Çıkış
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

