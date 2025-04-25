
import React from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" />
      <div className="mb-1 flex flex-col sm:flex-row sm:items-center">
        <span className="text-sm font-medium text-nordic-blue">{year}</span>
        <h3 className="text-lg font-medium sm:ml-4">{title}</h3>
      </div>
      <p className="text-nordic-dark/70">{description}</p>
    </div>
  );
};

const Timeline: React.FC = () => {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior UX Designer",
      description: "Leading design for multiple products with a focus on clean, minimalist interfaces that prioritize user experience."
    },
    {
      year: "2020 - 2023",
      title: "UI/UX Designer",
      description: "Designed interfaces for web and mobile applications, focusing on creating intuitive and aesthetically pleasing experiences."
    },
    {
      year: "2018 - 2020",
      title: "Web Designer",
      description: "Developed responsive websites and implemented design systems that improved consistency across platforms."
    },
    {
      year: "2016 - 2018",
      title: "Graphic Designer",
      description: "Created visual assets and branding materials for various clients, focusing on clean and minimalist designs."
    }
  ];

  const qualifications = [
    {
      year: "2022",
      title: "Advanced UX Certification",
      description: "Specialized training in user research methodologies and advanced interaction design patterns."
    },
    {
      year: "2019",
      title: "UI/UX Design Certificate",
      description: "Professional certification focusing on user-centered design processes and interface design principles."
    },
    {
      year: "2016",
      title: "Bachelor's Degree in Design",
      description: "Graduated with honors, specialized in digital media and interactive design."
    }
  ];

  return (
    <section id="experience" className="section bg-nordic-offwhite">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Experience & Qualifications</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-medium mb-6">Professional Experience</h3>
            <div className="ml-2">
              {experiences.map((exp, index) => (
                <TimelineItem
                  key={index}
                  year={exp.year}
                  title={exp.title}
                  description={exp.description}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-6">Education & Certificates</h3>
            <div className="ml-2">
              {qualifications.map((qual, index) => (
                <TimelineItem
                  key={index}
                  year={qual.year}
                  title={qual.title}
                  description={qual.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
