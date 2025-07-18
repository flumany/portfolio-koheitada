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

// Update project order within a category
export async function updateProjectOrderInCategory(projectIds: string[]) {
  try {
    console.log('Updating project order with IDs:', projectIds);
    
    // Update each project with its new display_order using a transaction
    const { error } = await supabase.rpc('update_project_orders', {
      project_ids: projectIds
    });

    if (error) {
      console.error('Error in updateProjectOrderInCategory RPC:', error);
      throw error;
    }
    
    console.log('Project order updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating project order:', error);
    
    // Fallback to individual updates if RPC fails
    try {
      console.log('Trying fallback individual updates...');
      const updates = [];
      
      for (let i = 0; i < projectIds.length; i++) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ 
            display_order: i,
            updated_at: new Date().toISOString() 
          })
          .eq('id', projectIds[i]);
          
        if (updateError) {
          console.error(`Error updating project ${projectIds[i]}:`, updateError);
          throw updateError;
        }
      }
      
      console.log('Fallback updates completed successfully');
      return true;
    } catch (fallbackError) {
      console.error('Fallback update also failed:', fallbackError);
      throw fallbackError;
    }
  }
}

// Category order management
export async function getCategoryOrder(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('category_order')
      .select('categories')
      .eq('id', 1)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching category order:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
    
    return data?.categories || [];
  } catch (error) {
    console.error('Error fetching category order:', error);
    return [];
  }
}

export async function updateCategoryOrder(categories: string[]): Promise<void> {
  try {
    console.log('Updating category order:', categories);
    
    // First try to update existing record
    const { data: existingData, error: fetchError } = await supabase
      .from('category_order')
      .select('id')
      .eq('id', 1)
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error checking existing category order:', fetchError);
      throw fetchError;
    }
    
    let result;
    if (existingData) {
      // Update existing record
      result = await supabase
        .from('category_order')
        .update({ categories })
        .eq('id', 1)
        .select();
    } else {
      // Insert new record
      result = await supabase
        .from('category_order')
        .insert({ id: 1, categories })
        .select();
    }
    
    if (result.error) {
      console.error('Error updating category order:', result.error);
      throw result.error;
    }
    
    console.log('Category order updated successfully:', result.data);
  } catch (error) {
    console.error('Error updating category order:', error);
    throw error;
  }
}

// Fetch projects with proper ordering
export async function fetchProjectsWithOrder() {
  try {
    // Get category order
    const categoryOrder = await getCategoryOrder();
    
    // Fetch all projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      throw error;
    }

    // Group projects by category
    const groupedProjects = projects.reduce((acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = [];
      }
      acc[project.category].push(project);
      return acc;
    }, {} as Record<string, ProjectWork[]>);

    // Sort categories by saved order, then by name for new categories
    const allCategories = Object.keys(groupedProjects);
    const sortedCategories = [
      ...categoryOrder.filter(cat => allCategories.includes(cat)),
      ...allCategories.filter(cat => !categoryOrder.includes(cat)).sort()
    ];

    // Return projects in category order
    const orderedProjects: ProjectWork[] = [];
    sortedCategories.forEach(category => {
      orderedProjects.push(...groupedProjects[category]);
    });

    return orderedProjects;
  } catch (error) {
    console.error('Error fetching projects with order:', error);
    throw error;
  }
}

// Fetch published projects with proper ordering
export async function fetchPublishedProjectsWithOrder() {
  try {
    const projects = await fetchProjectsWithOrder();
    return projects.filter(project => project.published);
  } catch (error) {
    console.error('Error fetching published projects with order:', error);
    throw error;
  }
}
