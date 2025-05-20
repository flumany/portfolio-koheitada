
import React from 'react';

const aboutLinesEn = [
  [
    <>
      After studying architecture, <br />
      I gained extensive experience <br />
      in design research and development <br />
      at an interior manufacturing company.
    </>
  ],
  [
    <>
      Utilizing my knowledge of 3D data <br />
      and experience with design software, <br />
      I now work on 3D design, XR development, <br />
      and UI/UX design for AI services.
    </>
  ],
  [
    <>
      I can consistently support all phases of product and service development—<br />
      from planning and visual design to 3D data, UI/UX, prototyping, and XR—<br />
      in a comprehensive manner.
    </>
  ]
];

const aboutLinesJa = [
  [
    <>
      建築学を学んだ後、主にインテリアメーカーの<br />
      デザイン研究開発職としての幅広く経験値を蓄えました。
    </>
  ],
  [
    <>
      その中で得た3Dデータの知見とデザインソフトの経験を活かし、<br />
      現在は3DデザインやXR開発、AIサービス開発における<br />
      UI/UXデザイン等に携わっています。
    </>
  ],
  [
    <>
      プロダクトやサービス開発に関わる領域を中心に、<br />
      企画・ビジュアルデザイン・3DデータやUI/UX/プロトタイピング/XRまで一気通貫で対応可能です。
    </>
  ]
];

const renderWithBreaks = (lines: (string | JSX.Element)[]) => (
  <>
    {lines.map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
      </React.Fragment>
    ))}
  </>
);

const About: React.FC = () => {
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
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                {renderWithBreaks(aboutLinesEn[0])}
              </p>
              <p className="text-xs md:text-sm text-nordic-dark/60">
                {renderWithBreaks(aboutLinesJa[0])}
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                {renderWithBreaks(aboutLinesEn[1])}
              </p>
              <p className="text-xs md:text-sm text-nordic-dark/60">
                {renderWithBreaks(aboutLinesJa[1])}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3D Design</h3>
              <p className="text-sm text-nordic-dark/70">Space & Digital Twin & Character Design</p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
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

        <div className="max-w-3xl mx-auto mt-12">
          <div className="rounded-xl border border-nordic-gray/40 bg-nordic-offwhite/80 px-6 py-7 md:py-9 shadow-sm backdrop-blur-[4px]">
            <p className="font-semibold text-base md:text-lg text-nordic-dark mb-2 tracking-wide">
              {renderWithBreaks(aboutLinesEn[2])}
            </p>
            <p className="text-xs md:text-sm text-nordic-dark/60">
              {renderWithBreaks(aboutLinesJa[2])}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
