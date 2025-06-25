
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseIframeContent } from '@/utils/iframeUtils';

interface WebEmbedTabProps {
  iframes: string[];
}

const WebEmbedTab: React.FC<WebEmbedTabProps> = ({ iframes }) => {
  const parsedPages = iframes && iframes.length > 0
    ? iframes.flatMap(iframe => parseIframeContent(iframe))
    : [];

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < parsedPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (parsedPages.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Navigation Controls at Top */}
      {parsedPages.length > 1 && (
        <div className="mb-6">
          {/* Previous/Next Buttons */}
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {parsedPages.length}
            </span>
            
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === parsedPages.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2">
            {parsedPages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all cursor-pointer",
                  currentPage === index 
                    ? "bg-nordic-blue w-6" 
                    : "bg-nordic-gray/40 hover:bg-nordic-gray/60"
                )}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Page Display */}
      <div className="min-h-[500px] flex items-center justify-center">
        {parsedPages[currentPage] && (
          <div 
            dangerouslySetInnerHTML={{ __html: parsedPages[currentPage] }}
            className="w-full flex justify-center [&_iframe]:max-w-full [&_iframe]:h-auto [&_iframe]:aspect-video"
          />
        )}
      </div>
    </div>
  );
};

export default WebEmbedTab;
