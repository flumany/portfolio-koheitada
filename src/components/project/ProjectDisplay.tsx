import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCarousel from './ProjectCarousel';
import ModelViewer3D from '../ModelViewer3D';
import { is3DModelFormat } from '@/utils/3dUtils';
import { ProjectWork } from '@/types/project';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 日本語は句読点のあと、英語はカンマ・セミコロン・コロンや主要前置詞/接続詞の前で改行。
 * 不自然な単語途中での改行を防ぐためCSSも適切に設定。
 */
function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  let formatted = text;

  // 日本語句読点の後で改行
  formatted = formatted.replace(/([。｡、，,！!？?])\s*/g, '$1\n');

  // 英語: カンマ, セミコロン, コロン, ピリオド, エクスクラメーション, クエスチョンの後で改行
  formatted = formatted.replace(/([,.!?;:])\s+/g, '$1\n');

  // 英語: よくある接続詞や前置詞の前で改行（単語区切りのみ/文頭文末じゃない場合）
  // ["for","and","nor","but","or","yet","so","in","at","to","with","from","on","by","of","as","if","that","because"]
  formatted = formatted.replace(
    /(\s)(for|and|nor|but|or|yet|so|in|at|to|with|from|on|by|of|as|if|that|because)\s/gi,
    '\n$2 '
  );

  // 連続しすぎる改行は2つまでにまとめる
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // 末尾の余計な改行除去
  formatted = formatted.replace(/\n+$/, '');

  return formatted;
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
  // iframesがある場合のデフォルトタブを決定
  const hasIframes = Boolean(currentWork.iframes && currentWork.iframes.length > 0);
  const hasImages = Boolean(currentImages.length > 0);
  const has3DModels = Boolean(
    currentModels.length > 0 || 
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl))
  );
  
  // デフォルトタブの優先順位: Web Embed > Images > 3D Model
  const getDefaultTab = () => {
    if (hasIframes) return 'web-embed';
    if (hasImages) return 'images';
    if (has3DModels) return '3d-model';
    return 'images';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());
  const [currentIframePage, setCurrentIframePage] = useState(0);
  
  // 本文事前整形
  const formattedDescription = formatTextWithLineBreaks(currentWork.description || '');

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md mb-8 border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium mb-6 tracking-tight">{currentWork.title}</h2>
      {/* 説明文のデザイン・余白・改行強化 */}
      <div
        className="prose prose-neutral max-w-none mb-8"
        style={{
          fontSize: "1.13rem",
          lineHeight: "2.08",
          letterSpacing: "0.01em",
          wordBreak: "normal", // 単語途中での強制改行はしない
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: "1.65em",
                  whiteSpace: 'normal', // pre-line等はやめる
                  wordBreak: "normal",
                }}
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  marginBottom: "1.4em",
                  paddingLeft: '1.45em',
                  wordBreak: "normal",
                }}
                {...props}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                style={{
                  marginBottom: "1.4em",
                  paddingLeft: '1.45em',
                  wordBreak: "normal",
                }}
                {...props}
              />
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
            {hasIframes && (
              <TabsTrigger value="web-embed" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                Web Embed
              </TabsTrigger>
            )}
            {hasImages && (
              <TabsTrigger value="images" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                Images
              </TabsTrigger>
            )}
            {has3DModels && (
              <TabsTrigger value="3d-model" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                3D Model
              </TabsTrigger>
            )}
          </TabsList>
          
          {hasIframes && (
            <TabsContent value="web-embed" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="relative">
                {/* Current iframe page */}
                <div className="w-full mb-6">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: currentWork.iframes?.[currentIframePage] || '' 
                    }}
                    className="w-full"
                    style={{
                      minHeight: '500px'
                    }}
                  />
                </div>
                
                {/* Navigation controls */}
                {currentWork.iframes && currentWork.iframes.length > 1 && (
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIframePage(prev => 
                        prev > 0 ? prev - 1 : currentWork.iframes!.length - 1
                      )}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      前のページ
                    </Button>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {currentIframePage + 1} / {currentWork.iframes.length}
                      </span>
                      
                      {/* Page indicators */}
                      <div className="flex gap-2">
                        {currentWork.iframes.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all",
                              currentIframePage === index ? "bg-nordic-blue w-4" : "bg-nordic-gray/40"
                            )}
                            onClick={() => setCurrentIframePage(index)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIframePage(prev => 
                        prev < currentWork.iframes!.length - 1 ? prev + 1 : 0
                      )}
                      className="flex items-center gap-2"
                    >
                      次のページ
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
          
          {hasImages && (
            <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
              <ProjectCarousel 
                images={currentImages} 
                iframes={[]}
                title={currentWork.title} 
              />
            </TabsContent>
          )}
          
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
