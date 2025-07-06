
import { useMemo } from 'react';
import { ProjectWork } from '@/types/project';

export const useProjectFiltering = (projects: ProjectWork[], filter: string) => {
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
    
  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Group projects by category for display with preserved order
  const groupedProjects = useMemo(() => {
    if (filter !== 'all') {
      return [{ category: filter, projects: filteredProjects }];
    }
    
    // Preserve the order from fetchPublishedProjectsWithOrder
    const categoryOrder: string[] = [];
    const grouped: { [key: string]: ProjectWork[] } = {};
    
    projects.forEach(project => {
      if (!grouped[project.category]) {
        grouped[project.category] = [];
        categoryOrder.push(project.category);
      }
      grouped[project.category].push(project);
    });
    
    return categoryOrder.map(category => ({
      category,
      projects: grouped[category]
    })).filter(group => group.projects.length > 0);
  }, [filter, filteredProjects, projects]);

  return {
    filteredProjects,
    categories,
    groupedProjects
  };
};
