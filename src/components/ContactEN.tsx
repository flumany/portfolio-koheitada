
import React from 'react';

const ContactEN: React.FC = () => {
  return (
    <section id="contact" className="section bg-nordic-gray">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            Contact
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-8" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-nordic-white p-8 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
                <p className="text-nordic-dark/70 mb-6">
                  I'm always interested in new opportunities and collaborations. 
                  Feel free to reach out if you'd like to discuss a project or just say hello.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Email</h4>
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-accent-blue hover:underline"
                  >
                    contact@example.com
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactEN;
