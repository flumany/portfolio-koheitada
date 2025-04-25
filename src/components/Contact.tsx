
import React from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">お問い合わせ</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
          <p className="text-nordic-dark/70">
            プロジェクトのご相談やお問い合わせはこちらからお願いいたします。
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-start">
              <div className="bg-nordic-beige p-3 rounded-full">
                <Mail size={20} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Email</h3>
                <p className="text-nordic-dark/70">contact@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-nordic-beige p-3 rounded-full">
                <Phone size={20} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Phone</h3>
                <p className="text-nordic-dark/70">+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-nordic-beige p-3 rounded-full">
                <MapPin size={20} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Location</h3>
                <p className="text-nordic-dark/70">Stockholm, Sweden</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-medium mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-nordic-gray/20 hover:bg-nordic-blue hover:text-white p-3 rounded-full transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="bg-nordic-gray/20 hover:bg-nordic-blue hover:text-white p-3 rounded-full transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-nordic-offwhite p-6 rounded-lg">
              <h3 className="font-medium mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-nordic-gray/30 focus:outline-none focus:ring-1 focus:ring-nordic-blue"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md border border-nordic-gray/30 focus:outline-none focus:ring-1 focus:ring-nordic-blue"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-nordic-gray/30 focus:outline-none focus:ring-1 focus:ring-nordic-blue"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-nordic-blue text-white py-3 rounded-md hover:bg-opacity-90 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
