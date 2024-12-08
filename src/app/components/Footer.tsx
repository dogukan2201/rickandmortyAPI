import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-6 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-gray-300 mb-4 sm:mb-0">
          © {new Date().getFullYear()} Doğukan Öztürk. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/dogukan2201"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/doğukan-öztürk-862497221/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
