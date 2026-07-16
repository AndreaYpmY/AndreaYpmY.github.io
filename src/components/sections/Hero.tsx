/**
 * Componente Hero.
 * Prima sezione visibile. Layout a due colonne su desktop: info a sinistra, mockup editor a destra.
 */

import { ArrowRight, Download, Github, Instagram, Mail } from "lucide-react";
import Button from "../ui/Button";
import type { HeroSection } from "../../types";

interface HeroProps {
  data: HeroSection;
}

const HackTheBoxIcon = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.956 0L1.189 6.183v11.625L11.956 24l10.767-6.192V6.183L11.956 0zM20.25 16.275l-8.294 4.773-8.294-4.773V6.71l8.294-4.773 8.294 4.773v9.565z" />
  </svg>
);

const Hero = ({ data }: HeroProps) => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Effetto glow di sfondo */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Colonna SX: Info e contatti */}
        <div className="text-center md:text-left space-y-6">
          
          {/* Badge status animato */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Currently Studying
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {data.name}
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-slate-300 font-light">
            {data.role}
          </h2>

          <p className="text-slate-400 text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
            {data.tagline}
          </p>

          {/* Rendering icone social */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            {data.socials.map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
              >
                {social.platform === "GitHub" && <Github size={20} />}
                {social.platform === "Instagram" && <Instagram size={20} />}
                {social.platform === "Email" && <Mail size={20} />}
                {social.platform === "Hack The Box" && <HackTheBoxIcon size={20} />}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <a href="#projects">
              <Button>
                View my work <ArrowRight size={18} />
              </Button>
            </a>
            
            {/* Mostra il bottone CV solo se l'URL esiste nel JSON */}
            {data.resumeUrl && (
              <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Download CV <Download size={18} />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Colonna DX: Mockup editor (nascosto su mobile) */}
        <div className="relative hidden md:flex justify-center">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl w-full max-w-md transform rotate-3 hover:rotate-0 transition duration-500">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                  <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex">
                    <span className="text-purple-400 mr-2">const</span>
                    <span className="text-yellow-400">developer</span>
                    <span className="text-white mx-2">=</span>
                    <span className="text-white">{`{`}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">name</span>: <span className="text-green-400">'{data.name}'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">focus</span>: <span className="text-green-400">'Cybersecurity'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">skills</span>: <span className="text-white">[</span>
                    <span className="text-green-400">'Python'</span>, <span className="text-green-400">'Bash'</span>, <span className="text-green-400">'Linux'</span>
                    <span className="text-white">]</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">buildsTools</span>: <span className="text-orange-400">true</span>,
                  </div>
                  <div className="text-white">{`}`}</div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;