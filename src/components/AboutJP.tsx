
import React from 'react';

const AboutJP: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                建築学を学んだ後、主にインテリアメーカーで開発や企画、品質管理などの幅広い経験を積みました。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                その中で得た3Dデータの知見とデザインソフトの経験を活かし、現在は3DデザインやXR開発、AIサービス開発におけるUI/UXデザイン等に携わっています。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                これまでに得た経験を活かしながら成長し、世の中により良い製品やサービスを提供していくことを目指しています。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3Dデザイン</h3>
              <p className="text-sm text-nordic-dark/70">空間・デジタルツイン・キャラクターデザイン</p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">XR開発</h3>
              <p className="text-sm text-nordic-dark/70">VR・AR・MR</p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">UXデザイン</h3>
              <p className="text-sm text-nordic-dark/70">デザイン思考・人間中心設計</p>
            </div>
            <div className="bg-nordic-offwhite border border-nordic-gray/30 p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">サービスデザイン</h3>
              <p className="text-sm text-nordic-dark/70">企画・製品設計・開発</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJP;
