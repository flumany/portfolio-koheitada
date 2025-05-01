
import { createClient } from '@supabase/supabase-js';

// Use the values from src/integrations/supabase/client.ts
const supabaseUrl = "https://uprgbkzhmjihouzhtapb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcmdia3pobWppaG91emh0YXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNzk4OTEsImV4cCI6MjA2MTY1NTg5MX0.C6vxq0l_WGt-8cM_GAUnSMP69v96S8ZVlQ3lN_9m-bw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get image URL from storage
export const getImageUrl = async (path: string): Promise<string> => {
  try {
    if (!path || path === '') {
      console.error('Empty path provided to getImageUrl');
      return '/placeholder.svg';
    }
    
    if (path.startsWith('http')) {
      return path; // Already a URL, return as is
    }
    
    const { data } = await supabase.storage
      .from('images')
      .getPublicUrl(path);
    
    if (!data?.publicUrl) {
      console.error('Error getting image URL: No public URL returned');
      return '/placeholder.svg'; // Placeholder image on error
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
      return path; // Already a URL, return as is
    }
    
    const { data } = await supabase.storage
      .from('3ddata')
      .getPublicUrl(path);
    
    if (!data?.publicUrl) {
      console.error('Error getting 3D model URL: No public URL returned');
      return ''; // Empty string on error
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in get3DModelUrl:', error);
    return '';
  }
};
