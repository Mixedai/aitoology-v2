-- Supabase SQL Editor'de çalıştırın
-- Bu script test kullanıcıları oluşturur

-- Test kullanıcısı oluştur (Admin panel üzerinden)
-- Authentication → Users → Invite User
-- Email: test@example.com
-- Password: otomatik oluşturulacak

-- Alternatif: Service role key ile API çağrısı
-- Not: Bu sadece backend'den çalışır

-- Profile tablosuna test verisi ekle
INSERT INTO profiles (id, username, full_name, created_at, updated_at)
VALUES 
  ('USER_ID_HERE', 'testuser', 'Test User', NOW(), NOW())
ON CONFLICT (id) DO UPDATE 
SET 
  username = EXCLUDED.username,
  full_name = EXCLUDED.full_name,
  updated_at = NOW();

-- USER_ID_HERE yerine Authentication → Users sayfasından kopyaladığınız User ID'yi yapıştırın