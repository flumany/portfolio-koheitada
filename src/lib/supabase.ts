
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ストレージからイメージURLを取得する関数
export const getImageUrl = async (path: string): Promise<string> => {
  try {
    if (!path || path === '') {
      console.error('Empty path provided to getImageUrl');
      return '/placeholder.svg';
    }
    
    if (path.startsWith('http')) {
      return path; // 既にURLの場合はそのまま返す
    }
    
    const { data } = await supabase.storage
      .from('images')
      .getPublicUrl(path);
    
    if (!data?.publicUrl) {
      console.error('Error getting image URL: No public URL returned');
      return '/placeholder.svg'; // エラー時はプレースホルダー画像
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in getImageUrl:', error);
    return '/placeholder.svg';
  }
};

// 3Dモデルのデータを取得する関数
export const get3DModelUrl = async (path: string): Promise<string> => {
  try {
    if (!path || path === '') {
      console.error('Empty path provided to get3DModelUrl');
      return '';
    }
    
    if (path.startsWith('http')) {
      return path; // 既にURLの場合はそのまま返す
    }
    
    const { data } = await supabase.storage
      .from('3ddata')
      .getPublicUrl(path);
    
    if (!data?.publicUrl) {
      console.error('Error getting 3D model URL: No public URL returned');
      return ''; // エラー時は空文字
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in get3DModelUrl:', error);
    return '';
  }
};
