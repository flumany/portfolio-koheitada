
/**
 * Utility functions for working with 3D models
 */

/**
 * Checks if a URL represents a 3D model file based on its extension
 */
export const is3DModelFormat = (url: string): boolean => {
  const validExtensions = ['.glb', '.gltf', '.fbx', '.obj', '.stl', '.usdz'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};
