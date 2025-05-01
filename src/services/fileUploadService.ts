
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file: File) {
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  return filePath;
}

export async function upload3DModel(file: File) {
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('3ddata')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading 3D model:', uploadError);
    throw uploadError;
  }

  return filePath;
}

export async function deleteFile(bucket: 'images' | '3ddata', filePath: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }

  return true;
}
