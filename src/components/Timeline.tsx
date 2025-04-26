
import React from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  subtitle?: string;
  certifyingBody?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  subtitle,
  certifyingBody 
}) => {
  return (
    <div className="timeline-item mb-8">
      <div className="timeline-dot" />
      <div className="mb-1">
        <span className="text-sm font-medium text-nordic-blue block mb-1">{year}</span>
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-nordic-dark/90 mt-1">{subtitle}</p>}
        <p className="text-nordic-dark/70 mt-1">{description}</p>
        {certifyingBody && (
          <p className="text-sm text-nordic-dark/60 mt-1">
            Certifying Body: {certifyingBody}
          </p>
        )}
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const experiences = [
    {
      year: "August 2022 - Present",
      title: "METABIRDS Co., Ltd.",
      description: "3D Generalist and Research & Development",
    },
    {
      year: "January 2019 - July 2022",
      title: "INOAC CORPORATION",
      description: "Bedding Products Planning and Research & Development Specialist",
    },
    {
      year: "April 2014 - December 2018",
      title: "KARIMOKU FURNITURE INC.",
      description: "Furniture Advanced Development and Research Specialist",
    }
  ];

  const education = [
    {
      year: "April 2010 - March 2014",
      title: "Osaka Institute of Technology",
      description: "大阪工業大学",
    },
    {
      year: "April 2007 - March 2010",
      title: "Hyogo Prefectural Akashi Nishi Senior High School",
      description: "兵庫県立明石西高等学校",
    }
  ];

  const qualifications = [
    {
      year: "April 2023",
      title: "Certified Human Centered Design Specialist",
      description: "HCD-Net認定 人間中心設計スペシャリスト",
      certifyingBody: "Human-Centered Design Organization (HCD-Net)",
    },
    {
      year: "February 2023",
      title: "Tableau Desktop Specialist",
      certifyingBody: "Salesforce",
    },
    {
      year: "January 2023",
      title: "Senior Virtual Reality Specialist",
      description: "上級バーチャルリアリティ技術者",
      certifyingBody: "The Virtual Reality Society of Japan",
    },
    {
      year: "December 2022",
      title: "Test in Color Coordination Grade 2",
      description: "色彩検定2級",
      certifyingBody: "色彩検定協会",
    },
    {
      year: "December 2022",
      title: "Test in Color Coordination - UC Grade",
      description: "色彩検定UC級",
      certifyingBody: "色彩検定協会",
    },
    {
      year: "August 2022",
      title: "CG Creator Certification Expert",
      certifyingBody: "Computer Graphic Arts Society",
    }
  ];

  const languages = [
    {
      year: "Present",
      title: "Japanese",
      description: "Native/Bilingual (ILR Level 5)",
    },
    {
      year: "Present",
      title: "English",
      description: "Professional Working Proficiency (ILR Level 3)",
    },
    {
      year: "Future Goal",
      title: "IELTS",
      description: "Band score of 7.0 or higher (Target)",
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
            <h3 className="text-2xl font-medium mb-6">Work Experience</h3>
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

            <h3 className="text-2xl font-medium mb-6 mt-12">Education</h3>
            <div className="ml-2">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  year={edu.year}
                  title={edu.title}
                  description={edu.description}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-6">Qualifications</h3>
            <div className="ml-2">
              {qualifications.map((qual, index) => (
                <TimelineItem
                  key={index}
                  year={qual.year}
                  title={qual.title}
                  description={qual.description}
                  certifyingBody={qual.certifyingBody}
                />
              ))}
            </div>

            <h3 className="text-2xl font-medium mb-6 mt-12">Languages</h3>
            <div className="ml-2">
              {languages.map((lang, index) => (
                <TimelineItem
                  key={index}
                  year={lang.year}
                  title={lang.title}
                  description={lang.description}
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
