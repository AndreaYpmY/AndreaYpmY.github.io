/**
 * Componente Navbar.
 * Barra di navigazione fissa in alto con effetto glassmorphism allo scroll.
 * Gestisce i link di ancoraggio e il toggle del menu su dispositivi mobili.
 */

import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
  ];

  // Aggiunge lo sfondo glassmorphism se la pagina è scrollata
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition">
          Andrea<span className="text-white">.Dev</span>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-indigo-400 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="https://github.com/AndreaYpmY"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-indigo-500 text-indigo-400 rounded-full hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-2"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Toggle Menu Mobile */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-800 border-t border-slate-700 shadow-xl">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-indigo-400 text-lg font-medium"
                onClick={() => setIsOpen(false)} // Chiude il menu al click
              >
                {link.name}
              </a>
            ))}
             <div className="flex gap-4 pt-4 border-t border-slate-700">
                <a href="https://github.com/AndreaYpmY" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github />
                </a>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;