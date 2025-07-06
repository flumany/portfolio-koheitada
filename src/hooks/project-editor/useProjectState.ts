
import { useState } from 'react';
import { ProjectWork } from '@/types/project';

export const useProjectState = () => {
  const [project, setProject] = useState<Partial<ProjectWork>>({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    category: '',
    slug: '',
    published: false,
    images: [],
    models: [],
    technologies: [],
    role: '',
    role_en: '',
    work_type: '',
    work_type_en: '',
    duration: '',
    challenge: '',
    challenge_en: '',
    solution: '',
    solution_en: '',
    iframes: []
  });

  const [technologiesInput, setTechnologiesInput] = useState('');
  const [embedCodeInput, setEmbedCodeInput] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');
  const [iframeList, setIframeList] = useState<string[]>([]);

  return {
    project,
    setProject,
    technologiesInput,
    setTechnologiesInput,
    embedCodeInput,
    setEmbedCodeInput,
    figmaUrl,
    setFigmaUrl,
    iframeList,
    setIframeList
  };
};
