import { supabase } from '@/lib/supabase';
import { ProjectWork, ProjectMedia } from '@/types/project';

// Fetch all projects
export async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data as ProjectWork[];
}

// Fetch published projects
export async function fetchPublishedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published projects:', error);
    throw error;
  }

  return data as ProjectWork[];
}

// Fetch a single project by slug
export async function fetchProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    throw error;
  }

  return data as ProjectWork;
}

// Create a new project
export async function createProject(project: Omit<ProjectWork, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data as ProjectWork;
}

// Update an existing project
export async function updateProject(id: string, updates: Partial<ProjectWork>) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data as ProjectWork;
}

// Toggle project's published status
export async function togglePublishStatus(id: string, publish: boolean) {
  const { data, error } = await supabase
    .from('projects')
    .update({ 
      published: publish,
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling publish status:', error);
    throw error;
  }

  return data as ProjectWork;
}

// Delete a project
export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }

  return true;
}

// Fetch media for a specific project
export async function fetchProjectMedia(projectId: string) {
  const { data, error } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(`Error fetching media for project ${projectId}:`, error);
    throw error;
  }

  return data as ProjectMedia[];
}

// Add new media to a project
export async function addProjectMedia(media: Omit<ProjectMedia, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('project_media')
    .insert([media])
    .select()
    .single();

  if (error) {
    console.error('Error adding project media:', error);
    throw error;
  }

  return data as ProjectMedia;
}

// Update media order
export async function updateMediaOrder(mediaId: string, newOrder: number) {
  const { data, error } = await supabase
    .from('project_media')
    .update({ display_order: newOrder })
    .eq('id', mediaId)
    .select()
    .single();

  if (error) {
    console.error('Error updating media order:', error);
    throw error;
  }

  return data as ProjectMedia;
}

// Delete media
export async function deleteProjectMedia(mediaId: string) {
  const { error } = await supabase
    .from('project_media')
    .delete()
    .eq('id', mediaId);

  if (error) {
    console.error('Error deleting project media:', error);
    throw error;
  }

  return true;
}

// Update project order
export async function updateProjectOrder(projectIds: string[]) {
  // For now, we'll update each project with its new order
  // In a real implementation, you might want to add an 'order' column to your database
  const updates = projectIds.map((id, index) => 
    supabase
      .from('projects')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', id)
  );

  try {
    await Promise.all(updates);
    return true;
  } catch (error) {
    console.error('Error updating project order:', error);
    throw error;
  }
}
