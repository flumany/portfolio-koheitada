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
      year: "2023 - 現在",
      title: "フリーランス Web開発者",
      description: "React, Vue.jsを用いたフロントエンド開発を中心に、複数のプロジェクトに参画。"
    },
    {
      year: "2021 - 2023",
      title: "株式会社ABC システムエンジニア",
      description: "業務系Webアプリケーションの設計・開発に従事。フロントエンド開発とバックエンド開発を担当。"
    },
    {
      year: "2019 - 2021",
      title: "株式会社XYZ Webエンジニア",
      description: "ECサイトのフロントエンド開発を担当。UI/UXの改善施策を実施。"
    }
  ];

  const qualifications = [
    {
      year: "2022",
      title: "AWS 認定ソリューションアーキテクト",
      description: "クラウドインフラストラクチャの設計・構築に関する専門知識を習得。"
    },
    {
      year: "2020",
      title: "情報処理安全確保支援士",
      description: "情報セキュリティに関する高度な知識とスキルを保有。"
    },
    {
      year: "2019",
      title: "応用情報技術者",
      description: "ITスキル標準におけるハイレベルな知識を習得。"
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
