
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nordic-beige py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-nordic-dark/80 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nordic Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-nordic-dark/70 hover:text-nordic-dark">Terms</a>
            <a href="#" className="text-nordic-dark/70 hover:text-nordic-dark">Privacy</a>
            <a href="#" className="text-nordic-dark/70 hover:text-nordic-dark">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
