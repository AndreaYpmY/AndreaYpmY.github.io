/**
 * Timeline education e certificazioni.
 * Renderizza le card a zig-zag su desktop.
 * Animazione base con IntersectionObserver per lo scroll.
 */

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Award, Calendar } from "lucide-react";

// Alias su Education per evitare conflitti di nome col componente
import type { Education as EducationType } from "../../types";

interface EducationProps {
  data: EducationType[];
}

const Education = ({ data }: EducationProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Triggera l'animazione di entrata una volta sola (soglia 15%)
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

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="min-h-screen py-24 border-b border-slate-800 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Intestazione */}
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Education & Achievements
          </h2>
        </div>

        {/* Container Timeline */}
        <div className="relative">
          
          {/* Linea verticale centrale con effetto glow */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-800 opacity-30 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

          <div className="space-y-12 md:space-y-24">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              
              // Switcha l'icona se è una certificazione
              const isCertification = item.degree.toLowerCase().includes("certificaz");
              const Icon = isCertification ? Award : GraduationCap;

              return (
                <div 
                  key={item.id} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Nodo centrale animato */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 text-indigo-400 z-10 transition-transform duration-500 hover:scale-110 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
                    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                  `}
                  style={{ transitionDelay: `${index * 200 + 100}ms` }}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Card contenuti */}
                  <div 
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${
                      isEven ? "md:pr-16" : "md:pl-16"
                    } transition-all duration-700 ${
                      isVisible 
                        ? "opacity-100 translate-x-0" 
                        : `opacity-0 ${isEven ? "-translate-x-12" : "translate-x-12"}` 
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="group p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
                      
                      <div className="flex items-center gap-2 text-indigo-400 mb-3 text-sm font-semibold tracking-wide">
                        <Calendar size={16} />
                        {item.date}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors mb-1">
                        {item.degree}
                      </h3>
                      
                      <h4 className="text-slate-400 font-medium mb-4">
                        {item.school}
                      </h4>
                      
                      {item.description && (
                        <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-700/50 pt-4 mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;