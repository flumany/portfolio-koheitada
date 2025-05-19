
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-medium mb-4 tracking-tight"> {/* 統一font */}
            About Me
          </h2>
          <div className="w-16 h-1 bg-nordic-purple mx-auto mb-8" /> {/* 紫に変更 */}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                After studying architecture, I gained extensive experience in design research and development at an interior manufacturing company.
              </p>
              <p className="text-xs md:text-sm text-nordic-dark/60">
                建築学を学んだ後、主にインテリアメーカーのデザイン研究開発職としての幅広く経験値を蓄えました。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                Utilizing my knowledge of 3D data and experience with design software, I now work on 3D design, XR development, and UI/UX design for AI services.
              </p>
              <p className="text-xs md:text-sm text-nordic-dark/60">
                その中で得た3Dデータの知見とデザインソフトの経験を活かし、現在は3DデザインやXR開発、AIサービス開発におけるのUI/UXデザイン等に携わっています。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                My goal is to grow with my experiences and create better products and services for society.
              </p>
              <p className="text-xs md:text-sm text-nordic-dark/60">
                これまでに得た経験を活かしつつ向上し、世の中に提供するより良い製品やサービスを創造していくことを目指しています。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3D Design</h3>
              <p className="text-sm text-nordic-dark/70">Space & Digital Twin & Character Design</p>
            </div>
            <div className="bg-nordic-purple p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2 text-white">XR Development</h3>
              <p className="text-sm text-white/90">Virtual, Augmented & Mixed Reality</p>
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

        {/* 差別化：枠と紫帯・透明感をアップ、下部メッセ ージ */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="rounded-xl border-2 border-nordic-purple bg-nordic-purple/10 px-6 py-8 md:py-10 shadow-lg backdrop-blur-[6px]">
            <p className="font-semibold text-base md:text-lg text-nordic-dark mb-2 tracking-wide">
              I can consistently support all phases of product and service development—including planning, visual design, 3D data, UI/UX, prototyping, and XR—with a particular focus on related domains.
            </p>
            <p className="text-xs md:text-sm text-nordic-dark/60">
              プロダクトやサービス開発に関わる領域を中心に、企画・ビジュアルデザイン・3DデータやUI/UX/プロトタイピング/XRまで一気通貫で対応可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

