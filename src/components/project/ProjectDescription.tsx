
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
      
      {/* Description Section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 text-nordic-dark">Description</h3>
        <div
          className="prose prose-neutral max-w-none"
          style={{
            fontSize: "1.13rem",
            lineHeight: "2.08",
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
                    marginBottom: "1.65em",
                    whiteSpace: 'normal',
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
      </div>
    </div>
  );
};

export default ProjectDescription;
