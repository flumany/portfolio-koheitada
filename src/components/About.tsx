
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">About Me</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              I'm a designer and developer focused on creating minimal, functional interfaces
              that embody the principles of Scandinavian design: simplicity, minimalism,
              and functionality.
            </p>
            <p>
              Working at the intersection of design and technology, I blend clean aesthetics 
              with intuitive interactions. I believe that good design should be both beautiful
              and useful, with every element having a clear purpose.
            </p>
            <p>
              My approach is influenced by the Nordic philosophy of "lagom" — not too much, 
              not too little, just right — creating balanced designs that are aesthetically 
              pleasing without unnecessary elements.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">UI Design</h3>
              <p className="text-sm text-nordic-dark/70">
                Clean interfaces with intuitive interactions
              </p>
            </div>
            <div className="bg-nordic-blue p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">UX Research</h3>
              <p className="text-sm text-nordic-dark/70">
                User-centered design processes
              </p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">3D Design</h3>
              <p className="text-sm text-nordic-dark/70">
                Minimalist 3D modeling and visualization
              </p>
            </div>
            <div className="bg-nordic-offwhite border border-nordic-gray/30 p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">Development</h3>
              <p className="text-sm text-nordic-dark/70">
                Frontend development with modern tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
