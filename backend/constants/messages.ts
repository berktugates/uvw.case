export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Hatalı Email veya Şifre',
    EMAIL_EXISTS: 'Bu email zaten kayıtlı',
  },
  PRODUCT: {
    NOT_FOUND: 'Ürün Bulunamadı',
    CODE_EXISTS: 'Bu koda sahip ürün zaten mevcut',
  },
  STOCK: {
    INSUFFICIENT: 'Yetersiz Stok',
    PRODUCT_NOT_FOUND: 'Ürün bulunamadı',
  },
} as const;

