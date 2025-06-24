
import React from 'react';

const AboutEN: React.FC = () => {
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
                After studying architecture, I gained extensive experience in product development, planning, and quality management at an interior manufacturing company.
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                Utilizing my knowledge of 3D data and experience with design software, I now work on 3D design, XR development, and UI/UX design for AI services.
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-nordic-dark mb-1">
                My goal is to grow with my experiences and create better products and services for society.
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
      </div>
    </section>
  );
};

export default AboutEN;
