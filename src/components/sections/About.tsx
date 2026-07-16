/**
 * Componente About
 * Sezione profilo con card in stile terminale.
 * Usa IntersectionObserver per un leggero effetto slide-in allo scroll.
 */

import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Code2, Coffee, type LucideIcon } from "lucide-react";
import type { AboutSection, AboutHighlight } from "../../types";

interface AboutProps {
  data: AboutSection;
}

// Mappa le stringhe del JSON ai componenti icone di Lucide
const highlightIcons: Record<AboutHighlight["icon"], LucideIcon> = {
  mappin: MapPin,
  calendar: Calendar,
  code: Code2,
  coffee: Coffee,
};

const About = ({ data }: AboutProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Attiva l'animazione di ingresso solo la prima volta che la sezione è visibile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 border-b border-slate-800 flex items-center"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center w-full">

        {/* Colonna SX: Immagine + card flottante */}
        <div
          className={`relative flex justify-center md:justify-start transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {/* Effetto glow di sfondo (stesso della Hero) */}
          <div className="absolute -top-10 -left-10 w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[100px] -z-10" />

          <div className="relative w-full max-w-sm">
            {/* 
              MODIFICA QUI: Aggiunto md: davanti a grayscale per applicare l'effetto solo da PC. 
              Su mobile sarà a colori di default.
            */}
            <img
              src={data.profileImage}
              alt={data.title}
              className="w-full aspect-[4/5] object-cover rounded-2xl border border-slate-700 md:grayscale md:hover:grayscale-0 transition-all duration-500 shadow-2xl"
            />

            {/* Card terminale coi quick facts (nascosta su mobile per non ingombrare) */}
            {data.highlights && data.highlights.length > 0 && (
              <div className="absolute -bottom-8 -right-8 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-2xl w-56 hidden sm:block">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2.5">
                  {data.highlights.map((item) => {
                    const Icon = highlightIcons[item.icon];
                    return (
                      <div key={item.label} className="flex items-center gap-2.5 text-sm">
                        <Icon size={15} className="text-indigo-400 shrink-0" />
                        <span className="text-slate-400">{item.label}:</span>
                        <span className="text-slate-200 font-medium truncate">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Colonna DX: Testi */}
        <div
          className={`space-y-6 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            whoami
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            {data.title}
          </h2>

          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            {data.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;