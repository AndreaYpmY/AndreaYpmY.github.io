/**
 * Componente Projects.
 * Gestisce due layout separati in base al flag `featured` nel JSON:
 * 1. Espanso a zig-zag per i progetti principali.
 * 2. Griglia compatta per gli esperimenti/secondari.
 */

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

// Type import (liveLink deve essere opzionale in type Project)
import type { Project } from "../../types";

interface ProjectsProps {
  data: Project[];
}

const Projects = ({ data }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Split array progetti
  const featuredProjects = data.filter((project) => project.featured);
  const regularProjects = data.filter((project) => !project.featured);

  // Trigger animazione allo scroll (soglia 10%)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-screen py-24 border-b border-slate-800 relative overflow-hidden"
    >
      {/* Glow bg */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Intestazione */}
        <div className={`text-center mb-24 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <FolderGit2 size={16} /> Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Projects
          </h2>
        </div>

        {/* 1. Progetti Featured (Zig-Zag Layout) */}
        <div className="space-y-24 md:space-y-32 mb-32">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={project.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center transition-all duration-700`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(50px)",
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Immagine con hover reveal solo da Desktop */}
                <div className="w-full md:w-3/5 group relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                  {/* MODIFICA: L'overlay è trasparente su mobile, ma scuro e sfocato su desktop finché non ci passi sopra */}
                  <div className="absolute inset-0 transition-all duration-500 z-10 bg-transparent backdrop-blur-0 md:bg-slate-900/60 md:backdrop-blur-[2px] md:group-hover:bg-transparent md:group-hover:backdrop-blur-0" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    // MODIFICA: Effetto zoom (scale-105) applicato solo su desktop
                    className="w-full h-[300px] md:h-[400px] object-cover object-center transform transition-transform duration-700 md:group-hover:scale-105"
                  />
                </div>

                {/* Info progetto */}
                <div className={`w-full md:w-2/5 flex flex-col items-center ${
                  isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"
                } text-center`}
                >
                  <span className="text-purple-400 text-sm font-bold tracking-wider uppercase mb-3">
                    Featured Project
                  </span>
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-slate-100 mb-6 hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Box descrizione */}
                  <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 text-slate-300 shadow-lg mb-6 leading-relaxed relative z-20">
                    {project.description}
                  </div>

                  {/* Tech stack */}
                  <div className={`flex flex-wrap gap-2 mb-8 justify-center ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 text-indigo-300 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4">
                  {project.repoLink && project.repoLink !== "#" && (
                    <a 
                        href={project.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white hover:border-indigo-500 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300"
                    >
                        <Github size={18} /> View Code
                    </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 border border-indigo-500 rounded-lg text-white hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Progetti Regolari (Griglia) */}
        {regularProjects.length > 0 && (
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <h3 className="text-2xl font-bold text-center text-slate-200 mb-12">
              Other Projects & Experiments
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group flex flex-col bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300"
                >
                  {/* Immagine */}
                  <div className="relative h-48 overflow-hidden">
                    {/* MODIFICA: Anche qui overlay leggero di base, scuro su desktop */}
                    <div className="absolute inset-0 transition-all duration-500 z-10 bg-slate-900/20 md:bg-slate-900/70 md:group-hover:bg-slate-900/30" />
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      // MODIFICA: Effetto zoom solo su desktop
                      className="w-full h-full object-cover transform transition-transform duration-700 md:group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-slate-200 group-hover:text-indigo-400 transition-colors mb-3">
                      {project.title}
                    </h4>
                    
                    <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs font-medium text-slate-300 bg-slate-900/50 px-2.5 py-1 rounded-md border border-slate-700/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Link footer */}
                    <div className="flex justify-between items-center mt-auto border-t border-slate-700/50 pt-4">
                    {project.repoLink && project.repoLink !== "#" && (
                        <a 
                            href={project.repoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;