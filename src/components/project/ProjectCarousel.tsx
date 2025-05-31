
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowBigLeft, ArrowBigRight, Image } from "lucide-react";
import type { UseEmblaCarouselType } from 'embla-carousel-react';

interface ProjectCarouselProps {
  images: string[];
  iframes?: string[];
  title: string;
}

const ProjectCarousel = ({ images, iframes = [], title }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [emblaApi, setEmblaApi] = React.useState<UseEmblaCarouselType[1] | null>(null);
  
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  
  const items = [...images, ...iframes];
  const isIframe = (index: number) => index >= images.length;
  
  return (
    <div className="relative">
      <Carousel 
        className="w-full" 
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {items.map((src, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="p-1 relative group">
                    {isIframe(index) ? (
                      <iframe 
                        src={src} 
                        className="w-full h-[400px] rounded-lg"
                        title={`${title} - Preview ${index + 1}`}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-[400px] bg-nordic-offwhite rounded-lg">
                        <img 
                          src={src} 
                          alt={`${title} - Image ${index + 1}`} 
                          className="w-full h-full object-contain rounded-lg group-hover:opacity-90 transition-opacity cursor-pointer bg-nordic-offwhite"
                          style={{ maxHeight: 400 }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/40 p-2 rounded-full">
                        <Image className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogTitle className="text-xl font-medium mb-4">{title}</DialogTitle>
                  {isIframe(index) ? (
                    <iframe 
                      src={src} 
                      className="w-full h-[80vh]"
                      title={`${title} - Full View ${index + 1}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full" style={{ minHeight: '60vh', background: '#F8F7F4' }}>
                      <img 
                        src={src} 
                        alt={`${title} - Image ${index + 1}`} 
                        className="w-full object-contain max-h-[75vh] bg-nordic-offwhite rounded"
                      />
                    </div>
                  )}
                  <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0 px-4">
                    <button 
                      onClick={() => emblaApi?.scrollPrev()}
                      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
                    >
                      <ArrowBigLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => emblaApi?.scrollNext()}
                      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
                    >
                      <ArrowBigRight className="w-6 h-6" />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/80 hover:bg-white">
          <ChevronLeft className="w-5 h-5" />
        </CarouselPrevious>
        <CarouselNext className="right-2 bg-white/80 hover:bg-white">
          <ChevronRight className="w-5 h-5" />
        </CarouselNext>
      </Carousel>
      
      {items.length > 1 && (
        <div className="flex justify-center mt-2 gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-nordic-blue w-4" : "bg-nordic-gray/40"
              )}
              onClick={() => {
                if (emblaApi) {
                  emblaApi.scrollTo(index);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;

