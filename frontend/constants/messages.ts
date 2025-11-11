export const MESSAGES = {
  AUTH: {
    LOGIN_FAILED: 'Hatalı mail veya şifre',
    REGISTER_FAILED: 'Kayıt başarısız',
  },
  PRODUCT: {
    CREATE_FAILED: 'Ürün oluşturulamadı',
    UPDATE_FAILED: 'Ürün güncellenemedi',
    DELETE_FAILED: 'Ürün silinemedi',
    DELETE_CONFIRM: 'Bu ürünü silmek istediğinizden emin misiniz?',
    NOT_FOUND: 'Ürün bulunamadı.',
  },
  STOCK: {
    IN_SUCCESS: 'Stok girişi başarılı!',
    IN_FAILED: 'Stok girişi başarısız',
    OUT_SUCCESS: 'Stok çıkışı başarılı!',
    OUT_FAILED: 'Stok çıkışı başarısız',
    INSUFFICIENT: 'Yetersiz stok! Mevcut stok:',
    LOW_STOCK: 'Düşük Stok!',
    MOVEMENTS_LOAD_FAILED: 'Hareketler yüklenemedi:',
    NO_MOVEMENTS: 'Henüz stok hareketi bulunmamaktadır.',
  },
  PERMISSION: {
    NO_ACCESS: 'Yetkiniz Yok',
    NO_ACCESS_DESCRIPTION: 'Bu sayfaya erişim için yetkiniz bulunmamaktadır.',
  },
  LOADING: {
    LOADING: 'Yükleniyor...',
    PROCESSING: 'İşleniyor...',
    LOGGING_IN: 'Giriş yapılıyor...',
    REGISTERING: 'Kayıt yapılıyor...',
  },
} as const;

