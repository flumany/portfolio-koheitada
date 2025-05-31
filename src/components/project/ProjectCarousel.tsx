
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectCarouselProps {
  images: string[];
  iframes: string[];
  title: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  images,
  iframes,
  title
}) => {
  // Combine images and iframes for the carousel
  const allItems = [
    ...images.map(img => ({ type: 'image', content: img })),
    ...iframes.map(iframe => ({ type: 'iframe', content: iframe }))
  ];

  if (allItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No media available</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {allItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {item.type === 'image' ? (
                <img
                  src={item.content}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {allItems.length > 1 && (
        <>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </>
      )}
    </Carousel>
  );
};

export default ProjectCarousel;
