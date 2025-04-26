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
              <p className="text-lg text-nordic-dark/80 mb-2">
                建築学を学んだ後、主にインテリアメーカーのデザイン研究開発職としての幅広く経験値を蓄えました。
              </p>
              <p className="text-sm text-nordic-dark/70 italic">
                After studying architecture, I gained extensive experience in design research and development at an interior manufacturing company.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-nordic-dark/80 mb-2">
                その中で3Dデータや3Dデザインソフトを使用した開発等も行っていたため、3Dにおける知識は人一倍備わっていると自負しております。
              </p>
              <p className="text-sm text-nordic-dark/70 italic">
                Through my work with 3D data and design software, I've developed deep expertise in 3D technologies and applications.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-nordic-dark/80 mb-2">
                現在はこれまでの経験を生かして、3DCG制作やメタバースにおけるデザイン制作などを行っています。
              </p>
              <p className="text-sm text-nordic-dark/70 italic">
                Currently, I leverage my experience in 3DCG production and metaverse design creation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3D Design</h3>
              <p className="text-sm text-nordic-dark/70">3DCG & Modeling</p>
            </div>
            <div className="bg-nordic-blue p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">XR</h3>
              <p className="text-sm text-nordic-dark/70">Virtual, Augmented & Mixed Reality</p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">UI/UX</h3>
              <p className="text-sm text-nordic-dark/70">Interface Design</p>
            </div>
            <div className="bg-nordic-offwhite border border-nordic-gray/30 p-6 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Physical Products</h3>
              <p className="text-sm text-nordic-dark/70">Product Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
