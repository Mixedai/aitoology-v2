// Supabase Storage Setup Script
// Bu script'i çalıştırarak gerekli bucket'ları oluşturabilirsiniz

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

// Service role client (admin access)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Bucket configurations for AI Toologist
const buckets = [
  {
    name: 'tool-logos',
    public: true,
    description: 'AI tool logos and icons',
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'],
    fileSizeLimit: 5242880, // 5MB
  },
  {
    name: 'tool-screenshots',
    public: true,
    description: 'Screenshots and preview images for AI tools',
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    fileSizeLimit: 10485760, // 10MB
  },
  {
    name: 'user-avatars',
    public: true,
    description: 'User profile pictures',
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    fileSizeLimit: 2097152, // 2MB
  },
  {
    name: 'tutorial-assets',
    public: true,
    description: 'Images and files for tutorials',
    allowedMimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
    fileSizeLimit: 52428800, // 50MB
  },
  {
    name: 'private-documents',
    public: false,
    description: 'Private user documents and exports',
    allowedMimeTypes: ['application/pdf', 'application/json', 'text/csv'],
    fileSizeLimit: 10485760, // 10MB
  },
];

async function setupStorage() {
  console.log('🚀 Setting up Supabase Storage buckets...\n');

  for (const bucket of buckets) {
    try {
      // Check if bucket exists
      const { data: existingBuckets } = await supabase.storage.listBuckets();
      const bucketExists = existingBuckets?.some(b => b.name === bucket.name);

      if (bucketExists) {
        console.log(`✅ Bucket "${bucket.name}" already exists`);
        
        // Update bucket configuration
        const { error: updateError } = await supabase.storage.updateBucket(bucket.name, {
          public: bucket.public,
          allowedMimeTypes: bucket.allowedMimeTypes,
          fileSizeLimit: bucket.fileSizeLimit,
        });

        if (updateError) {
          console.error(`❌ Error updating bucket "${bucket.name}":`, updateError.message);
        } else {
          console.log(`   Updated configuration`);
        }
      } else {
        // Create new bucket
        const { data, error } = await supabase.storage.createBucket(bucket.name, {
          public: bucket.public,
          allowedMimeTypes: bucket.allowedMimeTypes,
          fileSizeLimit: bucket.fileSizeLimit,
        });

        if (error) {
          console.error(`❌ Error creating bucket "${bucket.name}":`, error.message);
        } else {
          console.log(`✅ Created bucket "${bucket.name}"`);
          console.log(`   - Public: ${bucket.public}`);
          console.log(`   - Size limit: ${(bucket.fileSizeLimit / 1048576).toFixed(1)}MB`);
        }
      }

      // Set up RLS policies for private buckets
      if (!bucket.public) {
        console.log(`   🔒 Setting up RLS policies for private bucket...`);
        
        // This would normally be done via SQL in Supabase Dashboard
        // Example policies are shown here for documentation
        const policies = `
-- Allow users to upload their own files
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '${bucket.name}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to view their own files
CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = '${bucket.name}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = '${bucket.name}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
        `;
        
        console.log(`   📝 Run these policies in Supabase SQL Editor for bucket "${bucket.name}"`);
      }

      console.log('');
    } catch (error) {
      console.error(`❌ Unexpected error with bucket "${bucket.name}":`, error);
    }
  }

  console.log('\n✨ Storage setup complete!');
  console.log('\n📚 Next steps:');
  console.log('1. Go to Supabase Dashboard → Storage');
  console.log('2. Verify all buckets are created');
  console.log('3. For private buckets, add RLS policies via SQL Editor');
  console.log('4. Test file uploads with the storage test page');
}

// Run setup
setupStorage().catch(console.error);