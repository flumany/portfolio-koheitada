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
        <span className="text-sm font-medium" style={{color: "#a6bdfa"}}>{year}</span>
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-nordic-dark/90 mt-1">{subtitle}</p>}
        <p className="text-nordic-dark/70 mt-1">{description}</p>
        {certifyingBody && (
          <p className="text-sm text-nordic-dark/60 mt-1">
            認定機関: {certifyingBody}
          </p>
        )}
      </div>
    </div>
  );
};

const TimelineJP: React.FC = () => {
  const experiences = [
    {
      year: "2022年8月 - 現在",
      title: "株式会社メタバーズ",
      description: "3Dジェネラリスト・研究開発",
    },
    {
      year: "2019年1月 - 2022年7月",
      title: "株式会社イノアックコーポレーション",
      description: "寝具製品企画・研究開発スペシャリスト",
    },
    {
      year: "2014年4月 - 2018年12月",
      title: "カリモク皆栄株式会社",
      description: "家具先行開発・研究スペシャリスト",
    }
  ];

  const education = [
    {
      year: "2010年4月 - 2014年3月",
      title: "大阪工業大学",
      description: "建築学科",
    },
    {
      year: "2007年4月 - 2010年3月",
      title: "兵庫県立明石西高等学校",
      description: "",
    }
  ];

  const qualifications = [
    {
      year: "2023年4月",
      title: "HCD-Net認定 人間中心設計スペシャリスト",
      description: "",
      certifyingBody: "人間中心設計推進機構（HCD-Net）",
    },
    {
      year: "2023年2月",
      title: "Tableau Desktop Specialist",
      certifyingBody: "Salesforce",
    },
    {
      year: "2023年1月",
      title: "上級バーチャルリアリティ技術者",
      description: "",
      certifyingBody: "日本バーチャルリアリティ学会",
    },
    {
      year: "2022年12月",
      title: "色彩検定2級",
      description: "",
      certifyingBody: "色彩検定協会",
    },
    {
      year: "2022年12月",
      title: "色彩検定UC級",
      description: "",
      certifyingBody: "色彩検定協会",
    },
    {
      year: "2022年8月",
      title: "CGクリエイター検定エキスパート",
      certifyingBody: "CG-ARTS協会",
    }
  ];

  const languages = [
    {
      year: "現在",
      title: "日本語",
      description: "ネイティブレベル（ILR Level 5）",
    },
    {
      year: "現在",
      title: "英語",
      description: "ビジネスレベル（ILR Level 3）",
    },
    {
      year: "将来目標",
      title: "IELTS",
      description: "バンドスコア7.0以上（目標）",
    }
  ];

  return (
    <section id="experience" className="section bg-nordic-offwhite">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Experience</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-medium mb-6">職歴</h3>
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
            <h3 className="text-2xl font-medium mb-6 mt-12">学歴</h3>
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
            <h3 className="text-2xl font-medium mb-6">資格</h3>
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
            <h3 className="text-2xl font-medium mb-6 mt-12">語学</h3>
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

export default TimelineJP;
