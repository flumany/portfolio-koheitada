
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import type { UseEmblaCarouselType } from 'embla-carousel-react';

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

const ProjectCarousel = ({ images, title }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [emblaApi, setEmblaApi] = React.useState<UseEmblaCarouselType[1] | null>(null);
  
  // Update the current index when the carousel changes
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    // Initial call to set the index
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  
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
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="p-1 relative group">
                    <img 
                      src={image} 
                      alt={`${title} - Image ${index + 1}`} 
                      className="w-full h-[400px] object-cover rounded-lg group-hover:opacity-90 transition-opacity cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/40 p-2 rounded-full">
                        <Image className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img 
                    src={image} 
                    alt={`${title} - Image ${index + 1}`} 
                    className="w-full object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-8" />
        <CarouselNext className="-right-4 md:-right-8" />
      </Carousel>
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-2">
          {images.map((_, index) => (
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
