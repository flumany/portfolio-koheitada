
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  fetchProjectMedia,
  addProjectMedia,
  updateMediaOrder,
  deleteProjectMedia 
} from '@/services/projectService';
import { uploadImage, upload3DModel, deleteFile } from '@/services/fileUploadService';
import { ProjectMedia } from '@/types/project';
import { Loader2, ImageIcon, Upload, Trash2, CubeIcon } from 'lucide-react';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';

interface MediaManagerProps {
  projectId: string;
  initialMedia: ProjectMedia[];
}

const MediaManager: React.FC<MediaManagerProps> = ({ projectId, initialMedia }) => {
  const [media, setMedia] = useState<ProjectMedia[]>(initialMedia || []);
  const [activeTab, setActiveTab] = useState<'images' | '3d_model'>('images');
  const [isUploading, setIsUploading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<{[key: string]: string}>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Load media URLs
  useEffect(() => {
    const loadMediaUrls = async () => {
      const urls: {[key: string]: string} = {};
      
      for (const item of media) {
        try {
          if (item.type === 'image') {
            urls[item.id] = await getImageUrl(item.file_path);
          } else {
            urls[item.id] = await get3DModelUrl(item.file_path);
          }
        } catch (error) {
          console.error(`Error loading URL for media ${item.id}:`, error);
          urls[item.id] = item.type === 'image' ? '/placeholder.svg' : '';
        }
      }
      
      setMediaUrls(urls);
    };
    
    loadMediaUrls();
  }, [media]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const file = files[0];
      let filePath: string;
      
      // Determine file type and upload to appropriate bucket
      const is3DModel = ['glb', 'gltf', 'fbx', 'obj', 'stl'].includes(
        file.name.split('.').pop()?.toLowerCase() || ''
      );
      
      if (is3DModel) {
        filePath = await upload3DModel(file);
      } else {
        filePath = await uploadImage(file);
      }
      
      // Add to project_media
      const newMedia = await addProjectMedia({
        project_id: projectId,
        type: is3DModel ? '3d_model' : 'image',
        file_path: filePath,
        title: title || file.name,
        description: description,
        display_order: media.length
      });
      
      // Update state
      setMedia(prev => [...prev, newMedia]);
      
      // Clear form
      setTitle('');
      setDescription('');
      
      toast({
        title: "Success",
        description: `${is3DModel ? '3D Model' : 'Image'} uploaded successfully.`
      });
      
    } catch (error) {
      console.error('File upload failed:', error);
      toast({
        title: "Error",
        description: "Failed to upload file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleDeleteMedia = async (mediaItem: ProjectMedia) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    
    try {
      // Delete the file from storage
      await deleteFile(
        mediaItem.type === 'image' ? 'images' : '3ddata',
        mediaItem.file_path
      );
      
      // Delete from database
      await deleteProjectMedia(mediaItem.id);
      
      // Update state
      setMedia(prev => prev.filter(item => item.id !== mediaItem.id));
      
      toast({
        title: "Success",
        description: "Media deleted successfully."
      });
      
    } catch (error) {
      console.error('Failed to delete media:', error);
      toast({
        title: "Error",
        description: "Failed to delete media.",
        variant: "destructive"
      });
    }
  };

  const refreshMedia = async () => {
    try {
      const updatedMedia = await fetchProjectMedia(projectId);
      setMedia(updatedMedia);
    } catch (error) {
      console.error('Failed to refresh media:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as 'images' | '3d_model')}>
        <TabsList className="mb-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="3d_model">3D Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Upload Images</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Image title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Image description"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Select Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, GIF, WebP
                  </p>
                </div>
                
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Uploading...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Project Images</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {media
                .filter(item => item.type === 'image')
                .map(item => (
                  <div key={item.id} className="relative group overflow-hidden rounded-md border">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img 
                        src={mediaUrls[item.id] || '/placeholder.svg'} 
                        alt={item.title || 'Project image'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate">{item.title || 'Untitled'}</h4>
                      {item.description && (
                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteMedia(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
              {media.filter(item => item.type === 'image').length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-lg">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No images yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by uploading your first image.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="3d_model">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Upload 3D Models</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model-title">Title (optional)</Label>
                  <Input
                    id="model-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Model title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model-description">Description (optional)</Label>
                  <Textarea
                    id="model-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Model description"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model-upload">Select 3D Model</Label>
                  <Input
                    id="model-upload"
                    type="file"
                    accept=".glb,.gltf,.fbx,.obj,.stl"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats: GLB, GLTF, FBX, OBJ, STL
                  </p>
                </div>
                
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Uploading...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Project 3D Models</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {media
                .filter(item => item.type === '3d_model')
                .map(item => (
                  <div key={item.id} className="relative group overflow-hidden rounded-md border">
                    <div className="aspect-square flex items-center justify-center bg-gray-100">
                      <CubeIcon className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm truncate">{item.title || 'Untitled'}</h4>
                      {item.description && (
                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      )}
                      <p className="text-xs text-blue-500 truncate mt-1">
                        {item.file_path}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteMedia(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
              {media.filter(item => item.type === '3d_model').length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-lg">
                  <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No 3D models yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by uploading your first 3D model.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaManager;
