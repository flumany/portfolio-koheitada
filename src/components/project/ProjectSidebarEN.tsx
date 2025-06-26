
import React from 'react';
import { Info } from 'lucide-react';
import { ProjectWork } from '@/types/project';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatTextWithLineBreaks } from '@/utils/textUtils';

interface ProjectSidebarENProps {
  works: ProjectWork[];
  currentWork: ProjectWork;
  currentWorkIndex: number;
  onProjectChange: (index: number) => void;
}

// English translations for common Japanese project content
const translateToEnglish = (text: string): string => {
  const translations: { [key: string]: string } = {
    '従来のデザインでは進捗度は薄いグレーのパーセンテージで表示され、読書中のものは最近読んだ本とひとまとめにされ、読書継続への促進性が不足していることが課題として見受けられた。リデザインでは読書進捗度は楽天のブランドカラーでもあるクリムゾンレッド色のバーで目立つように表示し、読書中の本は続きを読むための単独セクションとして表示するなど、従来と比べて読書の継続を促進するような仕様とした。': 'The conventional design displayed reading progress with a faint gray percentage and grouped currently reading books with recently read ones, which lacked the promotional aspect for reading continuation. In the redesign, reading progress is prominently displayed with Rakuten\'s brand color crimson red bar, and currently reading books are shown in a dedicated section for continuing reading, creating specifications that promote reading continuation compared to the conventional approach.',
    '自主制作(調査/分析、プロトタイプ作成、デザイン全般)': 'Independent project (Research/Analysis, Prototyping, Overall Design)',
    'フィルムクリーナーの解説用CGアニメーション': 'CG animation for film cleaner explanation',
    '楽天Koboアプリ リデザイン': 'Rakuten Kobo App Redesign',
    'オーディオ企画': 'Audio Planning',
    '北欧デザイナースタイルのキャビネット': 'Nordic Designer Style Cabinet',
    '所有している腕時計': 'Owned Wristwatch'
  };
  
  return translations[text] || text;
};

const ProjectSidebarEN = ({ works, currentWork, currentWorkIndex, onProjectChange }: ProjectSidebarENProps) => {
  const formattedDescription = formatTextWithLineBreaks(translateToEnglish(currentWork.description || ''));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6 sticky top-20">
      <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
        <Info size={18} />
        Project Details
      </h3>

      {works.length > 1 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-2">Projects</h4>
          <div className="flex flex-wrap gap-2">
            {works.map((work, index) => (
              <button
                key={work.id}
                onClick={() => onProjectChange(index)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  currentWorkIndex === index 
                    ? 'bg-nordic-blue text-white' 
                    : 'bg-nordic-gray/20 hover:bg-nordic-gray/30'
                }`}
              >
                {translateToEnglish(work.title)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description Section */}
      {currentWork.description && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-2">Description</h4>
          <div
            className="prose prose-neutral max-w-none text-sm"
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.6",
              letterSpacing: "0.01em",
              wordBreak: "normal",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      marginBottom: "0.75em",
                      whiteSpace: 'pre-wrap',
                      wordBreak: "normal",
                    }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    style={{
                      marginBottom: "0.75em",
                      paddingLeft: '1.25em',
                      wordBreak: "normal",
                    }}
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    style={{
                      marginBottom: "0.75em",
                      paddingLeft: '1.25em',
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
        </div>
      )}

      {currentWork.technologies && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {currentWork.technologies.map((tech, index) => (
              <span key={index} className="bg-nordic-beige/50 px-2 py-1 text-xs rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {currentWork.role && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Role</h4>
          <p className="text-sm">{translateToEnglish(currentWork.role)}</p>
        </div>
      )}

      {currentWork.duration && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Duration</h4>
          <p className="text-sm">{currentWork.duration}</p>
        </div>
      )}

      {currentWork.challenge && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Challenge</h4>
          <p className="text-sm">{translateToEnglish(currentWork.challenge)}</p>
        </div>
      )}

      {currentWork.solution && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Solution</h4>
          <p className="text-sm">{translateToEnglish(currentWork.solution)}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectSidebarEN;
