
import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isComplete = form.name.trim() && form.email.trim() && form.message.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Contact</h2>
          <p className="text-nordic-dark/70">
            Feel free to reach out if you're interested in my work or have any questions
          </p>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-start">
              <div className="bg-nordic-beige p-3 rounded-full">
                <Mail size={20} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Email</h3>
                <p className="text-nordic-dark/70">tadakohei.0120@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-nordic-beige p-3 rounded-full">
                <Phone size={20} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Phone</h3>
                <p className="text-nordic-dark/70">+81 80-4841-4120</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-medium mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/flumany/" target="_blank" rel="noopener noreferrer" className="bg-nordic-gray/20 hover:bg-nordic-blue hover:text-white p-3 rounded-full transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/koheitada/" target="_blank" rel="noopener noreferrer" className="bg-nordic-gray/20 hover:bg-nordic-blue hover:text-white p-3 rounded-full transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-nordic-offwhite p-6 rounded-lg">
              <h3 className="font-medium mb-4">Send a Message</h3>
              <form 
                className="space-y-4" 
                action="mailto:tadakohei.0120+contact@gmail.com" 
                method="post" 
                encType="text/plain"
                onSubmit={e => {
                  if (!isComplete) e.preventDefault();
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
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
                    name="email"
                    value={form.email}
                    onChange={handleChange}
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
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-nordic-gray/30 focus:outline-none focus:ring-1 focus:ring-nordic-blue"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`w-full py-3 rounded-md transition-all ${
                    isComplete
                      ? '' // Remove bg-nordic-blue to apply style below
                      : 'bg-nordic-blue text-white opacity-60 cursor-not-allowed'
                  }`}
                  style={{
                    backgroundColor: isComplete ? '#a6bdfa' : undefined,
                    color: isComplete ? '#333' : undefined
                  }}
                  disabled={!isComplete}
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
