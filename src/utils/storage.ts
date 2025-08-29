// Storage Utility Functions for AI Toologist
import { supabase } from '../lib/supabaseClient';

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: { upsert?: boolean; contentType?: string }
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: options?.upsert || false,
        contentType: options?.contentType || file.type,
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error };
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Download a file from storage
 */
export async function downloadFile(bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, error };
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error };
  }
}

/**
 * List files in a bucket/folder
 */
export async function listFiles(bucket: string, folder?: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
      });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('List error:', error);
    return { success: false, error };
  }
}

/**
 * Upload user avatar
 */
export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;
  
  return uploadFile('user-avatars', fileName, file, { upsert: true });
}

/**
 * Upload tool logo
 */
export async function uploadToolLogo(toolId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${toolId}/logo.${fileExt}`;
  
  return uploadFile('tool-logos', fileName, file, { upsert: true });
}

/**
 * Upload tool screenshot
 */
export async function uploadToolScreenshot(
  toolId: string, 
  file: File, 
  index: number = 0
) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${toolId}/screenshot-${index}.${fileExt}`;
  
  return uploadFile('tool-screenshots', fileName, file);
}

/**
 * Get signed URL for private file (expires in 1 hour)
 */
export async function getSignedUrl(bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600); // 1 hour expiry

    if (error) throw error;
    return { success: true, url: data.signedUrl };
  } catch (error) {
    console.error('Signed URL error:', error);
    return { success: false, error };
  }
}

/**
 * Check if file exists
 */
export async function fileExists(bucket: string, path: string) {
  const result = await listFiles(bucket, path);
  return result.success && result.data && result.data.length > 0;
}

// Example usage:
/*
// Upload avatar
const file = event.target.files[0];
const result = await uploadAvatar('user-123', file);
if (result.success) {
  const url = getPublicUrl('user-avatars', `user-123/avatar.png`);
  console.log('Avatar URL:', url);
}

// Upload tool logo
const logoResult = await uploadToolLogo('chatgpt', logoFile);

// List all tool logos
const logos = await listFiles('tool-logos');

// Delete old avatar
await deleteFile('user-avatars', 'user-123/old-avatar.png');
*/

export default {
  uploadFile,
  getPublicUrl,
  downloadFile,
  deleteFile,
  listFiles,
  uploadAvatar,
  uploadToolLogo,
  uploadToolScreenshot,
  getSignedUrl,
  fileExists,
};