import React from 'react';
import { GlassWater, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GlassWater size={24} className="text-amber-200 mr-2" />
            <span className="font-serif text-lg font-bold">Whisky Goggle</span>
          </div>
          
          <div className="text-sm text-amber-200 mb-4 md:mb-0">
            Image classification system for whisky bottle identification
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              className="text-amber-200 hover:text-white transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              className="text-amber-200 hover:text-white transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-amber-800 text-sm text-amber-400 text-center">
          © {new Date().getFullYear()} Whisky Goggle Classification System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;