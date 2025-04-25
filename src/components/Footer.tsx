
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nordic-beige py-8">
      <div className="container-custom">
        <div className="flex justify-center items-center">
          <p className="text-nordic-dark/80">
            &copy; {new Date().getFullYear()} 多田 浩平
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
