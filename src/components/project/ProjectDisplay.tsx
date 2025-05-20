
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCarousel from './ProjectCarousel';
import ModelViewer3D from '../ModelViewer3D';
import { is3DModelFormat } from '@/utils/3dUtils';
import { ProjectWork } from '@/types/project';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * 日本語なら「。」「！」「？」の直後で改行、英語なら ". " "? " "! " のあとで改行を挿入
 * 既存の改行・複数改行は維持 or 整える
 */
function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  // 日本語：句点・感嘆符・疑問符（全角半角対応）、英語：". ", "? ", "! "など
  let result = text
    // 日本語の句読点後ろ
    .replace(/([。！？｡!?\?])(?=[^\n])/g, '$1\n')
    // 英語で文末(ピリオド/クエスチョン/エクスクラメーション)後にスペースの場合
    .replace(/([a-zA-Z0-9\)])([.!?])\s(?!\n)/g, '$1$2\n')
    // 余計な連続改行はまとめる
    .replace(/\n{3,}/g, '\n\n');
  return result;
}

interface ProjectDisplayProps {
  currentWork: ProjectWork;
  currentImages: string[];
  currentModels: string[];
  loading: boolean;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  currentWork,
  currentImages,
  currentModels,
  loading
}) => {
  const [activeTab, setActiveTab] = useState('images');
  
  // Determine if there are valid 3D models to display
  const has3DModels = Boolean(
    currentModels.length > 0 || 
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl))
  );

  // 本文を事前整形
  const formattedDescription = formatTextWithLineBreaks(currentWork.description || '');

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md mb-8 border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium mb-6 tracking-tight">{currentWork.title}</h2>
      {/* 説明文のデザイン・余白・改行強化 */}
      <div
        className="prose prose-neutral max-w-none mb-8 break-words"
        style={{
          fontSize: "1.13rem",
          lineHeight: "2.08",
          letterSpacing: "0.01em",
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p style={{ marginBottom: "1.6em", whiteSpace: 'pre-line' }} {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul style={{ marginBottom: "1.4em", paddingLeft: '1.45em' }} {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol style={{ marginBottom: "1.4em", paddingLeft: '1.45em' }} {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong style={{ fontWeight: 600 }} {...props} />
            ),
            br: () => <br />,
          }}
        >
          {formattedDescription}
        </ReactMarkdown>
      </div>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-8 w-40" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
          <TabsList className="mb-7 bg-nordic-offwhite rounded-lg p-1 gap-2 border border-nordic-gray/30 shadow-none">
            <TabsTrigger value="images" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">Images</TabsTrigger>
            {has3DModels && (
              <TabsTrigger value="3d-model" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                3D Model
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
            <ProjectCarousel 
              images={currentImages} 
              iframes={currentWork.iframes || []}
              title={currentWork.title} 
            />
          </TabsContent>
          {has3DModels && (
            <TabsContent value="3d-model" className="focus-visible:outline-none focus-visible:ring-0">
              <ModelViewer3D 
                modelUrl={currentWork.modelUrl} 
                models={currentModels.length > 0 ? currentModels : currentWork.models} 
              />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default ProjectDisplay;
