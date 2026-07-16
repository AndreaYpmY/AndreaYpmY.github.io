/**
 * Componente Footer.
 * Sezione finale con copyright dinamico e link social.
 * Layout responsive: impilato su mobile, in riga su desktop.
 */

import { Github, Instagram, Mail } from "lucide-react";

// SVG custom per Hack The Box (manca in lucide-react)
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

export interface SocialLink {
  id?: number;
  name?: string; 
  platform?: string; 
  url: string;
  icon: string;
}

interface FooterProps {
  data: SocialLink[];
  authorName: string;
}

// Map per instanziare l'icona corretta passata dal JSON
const iconMap: Record<string, any> = {
  github: Github,
  instagram: Instagram,
  email: Mail,
  mail: Mail,
  htb: HackTheBoxIcon,
  hackthebox: HackTheBoxIcon 
};

const Footer = ({ data, authorName }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="w-full py-8 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm relative z-10"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
        
        {/* Testo Copyright */}
        <div className="text-slate-500 text-sm font-medium">
          © {currentYear} - Developed by {authorName}
        </div>

        {/* Link Social */}
        <div className="flex items-center gap-4">
          {data.map((social, index) => {
            // Fallback sulla Mail se l'icona non viene trovata
            const Icon = iconMap[social.icon.toLowerCase()] || Mail;

            return (
              <a
                key={social.id || index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name || social.platform}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/40 border border-slate-700/50 text-slate-400 
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;