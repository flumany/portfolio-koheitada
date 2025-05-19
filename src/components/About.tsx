
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">About Me</h2>
          <p className="text-nordic-dark/70 mb-8">Passionate about creating meaningful experiences</p>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {/* 英語→日本語順 */}
              <p className="text-sm text-nordic-dark/70 italic">
                After studying architecture, I gained extensive experience in design research and development at an interior manufacturing company.
              </p>
              <p className="text-lg text-nordic-dark/80 mb-2">
                建築学を学んだ後、主にインテリアメーカーのデザイン研究開発職としての幅広く経験値を蓄えました。
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-nordic-dark/70 italic">
                Utilizing my knowledge of 3D data and experience with design software, I now work on 3D design, XR development, and UI/UX design for AI services.
              </p>
              <p className="text-lg text-nordic-dark/80 mb-2">
                その中で得た3Dデータの知見とデザインソフトの経験を活かし、現在は3DデザインやXR開発、AIサービス開発におけるのUI/UXデザイン等に携わっています。
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-nordic-dark/70 italic">
                My goal is to grow with my experiences and create better products and services for society.
              </p>
              <p className="text-lg text-nordic-dark/80 mb-2">
                これまでに得た経験を活かしつつ向上し、世の中に提供するより良い製品やサービスを創造していくことを目指しています。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3D Design</h3>
              <p className="text-sm text-nordic-dark/70">Space & Digital Twin & Character Design</p>
            </div>
            <div className="bg-nordic-blue p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">XR Development</h3>
              <p className="text-sm text-nordic-dark/70">Virtual, Augmented & Mixed Reality</p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">UX Design</h3>
              <p className="text-sm text-nordic-dark/70">Design Thinking & Human Centered Design</p>
            </div>
            <div className="bg-nordic-offwhite border border-nordic-gray/30 p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Service Design</h3>
              <p className="text-sm text-nordic-dark/70">Planning & Product Design and Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

