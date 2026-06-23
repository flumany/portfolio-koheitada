import { supabase } from '@/integrations/supabase/client';

export { supabase };

// Get image URL from storage
export const getImageUrl = async (path: string): Promise<string> => {
  try {
    if (!path || path === '') {
      console.error('Empty path provided to getImageUrl');
      return '/placeholder.svg';
    }

    if (path.startsWith('http')) {
      return path;
    }

    const { data } = await supabase.storage
      .from('images')
      .getPublicUrl(path);

    if (!data?.publicUrl) {
      console.error('Error getting image URL: No public URL returned');
      return '/placeholder.svg';
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error in getImageUrl:', error);
    return '/placeholder.svg';
  }
};

// Get 3D model URL from storage
export const get3DModelUrl = async (path: string): Promise<string> => {
  try {
    if (!path || path === '') {
      console.error('Empty path provided to get3DModelUrl');
      return '';
    }

    if (path.startsWith('http')) {
      return path;
    }

    const { data } = await supabase.storage
      .from('3ddata')
      .getPublicUrl(path);

    if (!data?.publicUrl) {
      console.error('Error getting 3D model URL: No public URL returned');
      return '';
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error in get3DModelUrl:', error);
    return '';
  }
};
