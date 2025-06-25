
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatTextWithLineBreaks } from '@/utils/textUtils';

interface ProjectDescriptionProps {
  title: string;
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ title, description }) => {
  const formattedDescription = formatTextWithLineBreaks(description || '');

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium mb-6 tracking-tight">{title}</h2>
      
      {description && (
        <div
          className="prose prose-neutral max-w-none text-base"
          style={{
            fontSize: "1rem",
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
      )}
    </div>
  );
};

export default ProjectDescription;
