# 🚀 Hızlı Schema Kurulumu

## Supabase SQL Editor'e Git:
https://supabase.com/dashboard/project/tbvfyhtkrvetmcibalfb/sql/new

## Aşağıdaki SQL'i Kopyala ve Çalıştır:

```sql
-- Bu dosyanın tamamını kopyalayıp Supabase SQL Editor'de çalıştırın
-- supabase/schema.sql dosyasını açıp tüm içeriği kopyalayın
```

## Adımlar:

1. **SQL Editor'e Git**: Yukarıdaki link'e tıkla
2. **Schema.sql'i Kopyala**: `supabase/schema.sql` dosyasının tamamını kopyala
3. **SQL Editor'e Yapıştır**: Boş query alanına yapıştır
4. **RUN Butonuna Tıkla**: Sağ alttaki yeşil RUN butonu
5. **Success Mesajını Bekle**: "Success. No rows returned" mesajı görünecek

## Kontrol:

Schema başarıyla oluşturulduktan sonra **Table Editor** sekmesine gidin ve şu tabloları görmelisiniz:

- ✅ profiles
- ✅ tools  
- ✅ reviews
- ✅ user_favorites
- ✅ collections
- ✅ collection_tools
- ✅ tool_comparisons
- ✅ review_votes
- ✅ tool_stats
- ✅ categories

## Sorun Giderme:

Eğer hata alırsanız:

1. **UUID Extension Hatası**: 
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```
   Bu satırı ayrı çalıştırın

2. **Permission Hatası**:
   - Database Settings → Extensions → uuid-ossp'yi aktifleştirin

3. **Table Already Exists**:
   - Önceki tabloları silmek için:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```

## ✅ Başarılı Kurulum Sonrası:

Terminal'e dön ve seed script'i çalıştır:
```bash
npx tsx supabase/seed.ts
```