/**
 * Componente Skills.
 * Riceve le skill piatte dal JSON, le raggruppa per categoria 
 * e le renderizza in una griglia di card. Animazione a cascata allo scroll.
 */

import { useEffect, useRef, useState } from "react";
import { Shield, Code, Cpu, Layers, type LucideIcon } from "lucide-react";
import type { Skill } from "../../types";

interface SkillsProps {
  data: Skill[];
}

// Mapping icone per categoria (usa Layers come fallback)
const categoryIcons: Record<string, LucideIcon> = {
  "Cybersecurity": Shield,
  "Software Development": Code,
  "Tools e AI": Cpu,
};

const Skills = ({ data }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animazione ingresso (soglia 15%)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 } 
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Raggruppa l'array di skill per categoria 
  // Es: { "Cybersecurity": [...], "Sviluppo Web": [...] }
  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-24 border-b border-slate-800 relative"
    >
      {/* Glow bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Intestazione */}
        <div className={`text-center md:text-left mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            Skills
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Tech Stack & Tools
          </h2>
        </div>

        {/* Grid Categorie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, skills], index) => {
            const Icon = categoryIcons[category] || Layers;

            return (
              <div
                key={category}
                // Stagger effect per l'entrata a cascata
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-500 
                  hover:bg-slate-800/60 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                `}
              >
                {/* Header card */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {category}
                  </h3>
                </div>

                {/* Badges tech */}
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 bg-slate-900/60 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-medium
                        hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;