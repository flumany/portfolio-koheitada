import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  useCORS?: boolean;
}

export const generatePDF = async (
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'portfolio.pdf',
    quality = 0.95,
    scale = 2,
    useCORS = true
  } = options;

  try {
    // Hide scrollbars temporarily
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = await html2canvas(element, {
      scale,
      useCORS,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      height: element.scrollHeight,
      width: element.scrollWidth,
      scrollX: 0,
      scrollY: 0,
    });

    // Restore original overflow
    document.body.style.overflow = originalOverflow;

    const imgData = canvas.toDataURL('image/png', quality);
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // A4 size in points (72 DPI)
    const a4Width = 595.28;
    const a4Height = 841.89;

    // Calculate scaling to fit content on A4
    const ratio = Math.min(a4Width / imgWidth, a4Height / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    const pdf = new jsPDF('portrait', 'pt', 'a4');

    // If content is taller than A4, split into multiple pages
    if (scaledHeight > a4Height) {
      const pageHeight = imgHeight * (a4Width / imgWidth);
      const totalPages = Math.ceil(scaledHeight / a4Height);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const yOffset = -(i * a4Height * (imgWidth / a4Width));
        pdf.addImage(
          imgData,
          'PNG',
          0,
          yOffset,
          a4Width,
          pageHeight,
          undefined,
          'FAST'
        );
      }
    } else {
      // Content fits on one page
      const x = (a4Width - scaledWidth) / 2;
      const y = (a4Height - scaledHeight) / 2;
      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF生成に失敗しました');
  }
};

export const generateMultiPagePDF = async (
  pages: { element: HTMLElement; title: string }[],
  filename: string = 'portfolio-complete.pdf'
): Promise<void> => {
  try {
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    const a4Width = 595.28;
    const a4Height = 841.89;

    for (let i = 0; i < pages.length; i++) {
      const { element, title } = pages[i];

      if (i > 0) {
        pdf.addPage();
      }

      // Add page title
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text(title, 40, 40);

      // Hide scrollbars temporarily
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        height: element.scrollHeight,
        width: element.scrollWidth,
      });

      // Restore original overflow
      document.body.style.overflow = originalOverflow;

      const imgData = canvas.toDataURL('image/png', 0.95);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate scaling to fit content on A4 (with margins)
      const maxWidth = a4Width - 80; // 40pt margins on each side
      const maxHeight = a4Height - 120; // 60pt top, 60pt bottom
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      // Center the content
      const x = (a4Width - scaledWidth) / 2;
      const y = 60 + (maxHeight - scaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

      // Add page number
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`${i + 1} / ${pages.length}`, a4Width - 60, a4Height - 20);
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating multi-page PDF:', error);
    throw new Error('PDF生成に失敗しました');
  }
};