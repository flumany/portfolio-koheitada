import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generatePDF, generateMultiPagePDF } from '@/utils/pdfUtils';

interface PDFExporterProps {
  language?: 'jp' | 'en';
  className?: string;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ 
  language = 'jp', 
  className = '' 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportCurrentPage = async () => {
    setIsGenerating(true);
    try {
      const mainElement = document.querySelector('main') || document.body;
      await generatePDF(mainElement as HTMLElement, {
        filename: `portfolio-${language === 'jp' ? 'japanese' : 'english'}.pdf`,
        quality: 0.95,
        scale: 2,
      });
      
      toast({
        title: language === 'jp' ? 'PDF出力完了' : 'PDF Export Complete',
        description: language === 'jp' ? 
          'ポートフォリオのPDFが正常に生成されました。' : 
          'Portfolio PDF has been successfully generated.',
      });
    } catch (error) {
      toast({
        title: language === 'jp' ? 'エラー' : 'Error',
        description: language === 'jp' ? 
          'PDF生成中にエラーが発生しました。' : 
          'An error occurred while generating the PDF.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportFullSite = async () => {
    setIsGenerating(true);
    try {
      // ページ要素を取得
      const heroSection = document.querySelector('[data-section="hero"]');
      const aboutSection = document.querySelector('[data-section="about"]');
      const projectsSection = document.querySelector('[data-section="projects"]');
      const timelineSection = document.querySelector('[data-section="timeline"]');
      const contactSection = document.querySelector('[data-section="contact"]');

      const pages = [];

      // セクションが存在する場合のみ追加
      if (heroSection) {
        pages.push({
          element: heroSection as HTMLElement,
          title: language === 'jp' ? 'プロフィール' : 'Profile'
        });
      }

      if (aboutSection) {
        pages.push({
          element: aboutSection as HTMLElement,
          title: language === 'jp' ? '自己紹介' : 'About Me'
        });
      }

      if (projectsSection) {
        pages.push({
          element: projectsSection as HTMLElement,
          title: language === 'jp' ? 'プロジェクト' : 'Projects'
        });
      }

      if (timelineSection) {
        pages.push({
          element: timelineSection as HTMLElement,
          title: language === 'jp' ? '経歴' : 'Timeline'
        });
      }

      if (contactSection) {
        pages.push({
          element: contactSection as HTMLElement,
          title: language === 'jp' ? 'お問い合わせ' : 'Contact'
        });
      }

      if (pages.length === 0) {
        // フォールバック：メイン要素全体を使用
        const mainElement = document.querySelector('main') || document.body;
        pages.push({
          element: mainElement as HTMLElement,
          title: language === 'jp' ? 'ポートフォリオ' : 'Portfolio'
        });
      }

      await generateMultiPagePDF(
        pages,
        `portfolio-complete-${language === 'jp' ? 'japanese' : 'english'}.pdf`
      );

      toast({
        title: language === 'jp' ? 'PDF出力完了' : 'PDF Export Complete',
        description: language === 'jp' ? 
          '全ページのPDFが正常に生成されました。' : 
          'Complete portfolio PDF has been successfully generated.',
      });
    } catch (error) {
      toast({
        title: language === 'jp' ? 'エラー' : 'Error',
        description: language === 'jp' ? 
          'PDF生成中にエラーが発生しました。' : 
          'An error occurred while generating the PDF.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={handleExportCurrentPage}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {language === 'jp' ? '現在のページ' : 'Current Page'}
      </Button>
      
      <Button
        onClick={handleExportFullSite}
        disabled={isGenerating}
        variant="default"
        size="sm"
        className="flex items-center gap-2"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {language === 'jp' ? '全ページ' : 'Full Site'}
      </Button>
    </div>
  );
};

export default PDFExporter;