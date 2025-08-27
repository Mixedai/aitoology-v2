-- Supabase SQL Editor'de bu sorguyu çalıştırın
-- https://supabase.com/dashboard/project/tbvfyhtkrvetmcibalfb/sql/new

-- Auth.users tablosunu kontrol et
SELECT id, email, created_at, confirmed_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;

-- Eğer test kullanıcıları görüyorsanız, onların ID'lerini alın
-- Ve profiles tablosuna ekleyin:

-- INSERT INTO profiles (id, full_name, username, created_at, updated_at)
-- SELECT 
--   id,
--   'Test User',
--   'testuser',
--   NOW(),
--   NOW()
-- FROM auth.users
-- WHERE email LIKE '%@example.com'
-- ON CONFLICT (id) DO NOTHING;