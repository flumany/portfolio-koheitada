
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseIframeContent, isAppStoreUrl } from '@/utils/iframeUtils';

interface WebEmbedTabProps {
  iframes: string[];
}

const WebEmbedTab: React.FC<WebEmbedTabProps> = ({ iframes }) => {
  const parsedPages = iframes && iframes.length > 0
    ? iframes.flatMap(iframe => parseIframeContent(iframe))
    : [];

  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // App Store/Play Storeリンクのクリックハンドラーを設定
  useEffect(() => {
    const handleAppStoreLinks = () => {
      if (!contentRef.current) return;
      
      const appStoreLinks = contentRef.current.querySelectorAll('.app-store-link');
      appStoreLinks.forEach((link) => {
        const url = link.getAttribute('data-url');
        if (url && isAppStoreUrl(url)) {
          link.innerHTML = `
            <div class="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span class="font-semibold">アプリストアで開く</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </div>
                <p class="text-sm text-gray-600">${url}</p>
              </div>
            </div>
          `;
          
          link.addEventListener('click', () => {
            window.open(url, '_blank', 'noopener,noreferrer');
          });
        }
      });
    };

    handleAppStoreLinks();
  }, [currentPage, parsedPages]);

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
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: parsedPages[currentPage] }}
            className="w-full flex justify-center [&_iframe]:max-w-full [&_iframe]:h-auto [&_iframe]:aspect-video [&_.app-store-link]:w-full [&_.app-store-link]:max-w-md [&_.app-store-link]:mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default WebEmbedTab;
