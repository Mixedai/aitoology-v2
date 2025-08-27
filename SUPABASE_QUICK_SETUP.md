# 🚀 Supabase Hızlı Kurulum Rehberi

## 1️⃣ Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. "New Project" butonuna tıklayın
3. Şu bilgileri girin:
   - **Project Name**: aitoology
   - **Database Password**: Güçlü bir şifre belirleyin (kaydedin!)
   - **Region**: Central EU (Frankfurt) veya size en yakın bölge
4. "Create new project" tıklayın (1-2 dakika sürer)

## 2️⃣ API Anahtarlarını Alma

Proje oluştuktan sonra:

1. Sol menüden **Settings → API** gidin
2. Şu değerleri kopyalayın:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public** key: `eyJhbGci...` (uzun bir string)
   - **service_role** key: `eyJhbGci...` (Settings → API → Service role key)

## 3️⃣ .env Dosyasını Güncelleme

`.env` dosyasını açın ve değerleri yapıştırın:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

## 4️⃣ Veritabanı Tablolarını Oluşturma

1. Supabase Dashboard'da **SQL Editor** sekmesine gidin
2. "New Query" butonuna tıklayın
3. `supabase/schema.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın
5. "Run" butonuna tıklayın ✅

## 5️⃣ Authentication Ayarları

1. **Authentication → Providers** gidin
2. **Email** provider'ı aktif olmalı (varsayılan)
3. **Google OAuth** eklemek için:
   - Google provider'ı etkinleştirin
   - [Google Cloud Console](https://console.cloud.google.com/) gidin
   - Yeni proje veya mevcut proje seçin
   - APIs & Services → Credentials → Create Credentials → OAuth Client ID
   - Application type: Web application
   - Authorized redirect URIs: `https://xxxxx.supabase.co/auth/v1/callback`
   - Client ID ve Client Secret'i Supabase'e yapıştırın

4. **GitHub OAuth** eklemek için:
   - GitHub provider'ı etkinleştirin
   - [GitHub Settings](https://github.com/settings/developers) → New OAuth App
   - Application name: AI Toology
   - Homepage URL: http://localhost:5173
   - Authorization callback URL: `https://xxxxx.supabase.co/auth/v1/callback`
   - Client ID ve Client Secret'i Supabase'e yapıştırın

## 6️⃣ Test Verilerini Yükleme

Terminal'de şu komutları çalıştırın:

```bash
# Dependencies yükle
npm install

# Seed script'i çalıştır
npx tsx supabase/seed.ts
```

✅ "Database seeding completed successfully!" mesajını görmelisiniz.

## 7️⃣ Uygulamayı Test Etme

```bash
npm run dev
```

Tarayıcıda http://localhost:5173 açın ve test edin:

1. **Sign Up** - Yeni hesap oluşturun
2. **Sign In** - Giriş yapın
3. **Tools** - Araçların yüklendiğini kontrol edin
4. **Favorites** - Favorilere ekleme test edin

## 🔧 Sorun Giderme

### "Invalid API key" hatası
- `.env` dosyasındaki anahtarların doğru olduğundan emin olun
- Sayfayı yenileyin (Ctrl+F5)

### "relation does not exist" hatası
- Schema.sql dosyasının tam olarak çalıştığından emin olun
- SQL Editor'de tekrar çalıştırın

### OAuth çalışmıyor
- Redirect URL'lerin doğru olduğundan emin olun
- Provider'ların enabled olduğunu kontrol edin

### Veriler görünmüyor
- Seed script'in başarılı çalıştığını kontrol edin
- Table Editor'den verileri kontrol edin

## 📊 Supabase Dashboard'da Kontrol Edilecekler

1. **Table Editor**: Tablolar ve veriler
2. **Authentication → Users**: Kayıtlı kullanıcılar
3. **SQL Editor**: Sorgu çalıştırma
4. **Logs**: Hata logları

## 🎉 Hazır!

Artık Supabase tamamen kurulu ve çalışıyor. Şunları yapabilirsiniz:

- ✅ Kullanıcı kaydı ve girişi
- ✅ Google/GitHub ile giriş
- ✅ Araçları görüntüleme
- ✅ Favorilere ekleme
- ✅ Yorum yazma
- ✅ Koleksiyon oluşturma
- ✅ Gerçek zamanlı güncellemeler