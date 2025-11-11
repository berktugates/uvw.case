# Stok Yönetim Sistemi

Rol bazlı yetkilendirme ile çalışan, depo giriş-çıkış işlemlerini yöneten stok yönetim uygulaması.

## Kullanılan Teknolojiler

### Backend
- **Nest.js** - Node.js framework
- **PostgreSQL** - İlişkisel veritabanı
- **Prisma** - ORM
- **JWT** - Kimlik doğrulama
- **TypeScript** - Tip güvenliği

### Frontend
- **Next.js 15** (App Router) - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stil framework'ü
- **Zustand** - State management
- **Axios** - HTTP client

## Mimari Yapı

### Backend Yapısı
```
backend/
├── src/
│   ├── config/          # Prisma ve genel konfigürasyonlar
│   ├── modules/         # Feature modülleri
│   │   ├── auth/        # Kimlik doğrulama modülü
│   │   ├── products/    # Ürün yönetimi modülü
│   │   └── stock/       # Stok işlemleri modülü
│   ├── middlewares/     # Guard'lar ve middleware'ler
│   ├── utils/           # Yardımcı fonksiyonlar
│   └── main.ts          # Uygulama giriş noktası
├── prisma/
│   └── schema.prisma    # Veritabanı şeması
└── package.json
```

### Frontend Yapısı
```
frontend/
├── app/
│   ├── (auth)/          # Kimlik doğrulama sayfaları
│   │   ├── login/
│   │   └── register/
│   └── (inventory)/     # Stok yönetim sayfaları
│       ├── products/
│       └── stock/
│           ├── in/
│           ├── out/
│           └── movements/
├── components/          # UI bileşenleri
├── lib/
│   └── api/            # API servisleri
├── store/              # Zustand store'ları
└── package.json
```

## Kurulum Adımları

### Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Prisma Client'ı oluşturun:
```bash
npm run prisma:generate
```

4. `.env` dosyası oluşturun:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stock_management"
JWT_SECRET="your-secret-key-here"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

5. Veritabanı migration'larını çalıştırın:
```bash
npm run prisma:migrate
```

6. Backend'i başlatın:
```bash
npm run start:dev
```

### Frontend Kurulumu

1. Frontend klasörüne gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Frontend'i başlatın:
```bash
npm run dev
```

## Kullanıcı Rolleri ve Yetkileri

### Admin
- Tüm işlemlere tam erişim
- Ürün oluşturma, düzenleme, silme
- Stok giriş-çıkış işlemleri
- Stok hareketlerini görüntüleme

### Storekeeper (Depo Yetkilisi)
- Ürün oluşturma, düzenleme, silme
- Stok giriş-çıkış işlemleri
- Stok hareketlerini görüntüleme
- Ürünleri görüntüleme

### Employee (Çalışan)
- Sadece ürünleri görüntüleme (read-only)
- Stok işlemleri yapamaz

## API Endpoints

### Auth
- `POST /auth/register` - Kullanıcı kayıt
- `POST /auth/login` - Kullanıcı giriş

### Products
- `POST /products` - Yeni ürün oluştur (Admin, Storekeeper)
- `GET /products` - Tüm ürünleri listele (Admin, Storekeeper, Employee)
- `GET /products/:id` - Ürün detayı (Admin, Storekeeper, Employee)
- `PATCH /products/:id` - Ürün güncelle (Admin, Storekeeper)
- `DELETE /products/:id` - Ürün sil (Admin, Storekeeper)

### Stock
- `POST /stock/in` - Stok girişi (Admin, Storekeeper)
- `POST /stock/out` - Stok çıkışı (Admin, Storekeeper)
- `GET /stock/movements` - Stok hareketleri (Admin, Storekeeper)

## Bonus Özellikler

- Stok hareketleri takibi (StockMovement modeli)
- Stok hareketleri filtreleme (ürün, tür, tarih aralığı)
- Düşük stok uyarıları
- Yetersiz stok kontrolü
- Rol bazlı yetkilendirme
- JWT tabanlı kimlik doğrulama

## Geliştirme Notları

- Proje katmanlı mimari prensiplerine uygun olarak geliştirilmiştir
- Controller → Service → Repository yapısı kullanılmıştır
- TypeScript ile tip güvenliği sağlanmıştır


