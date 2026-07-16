/**
 * COMPONENTE: Button.tsx
 * 
 * È un componente atomico e riutilizzabile che rappresenta il pulsante standard del sito.
 * Serve a garantire coerenza visiva in tutto il portfolio (stesse transizioni, arrotondamenti e comportamenti al click).
 * Supporta diverse varianti estetiche (primary, secondary, outline) e accetta tutte le proprietà standard 
 * dei bottoni HTML nativi (come onClick, type, disabled, ecc.) grazie all'estensione delle props di React.
 */

import React from "react";

// Definizione delle proprietà accettate dal componente, estendendo quelle di un normale bottone HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"; // Tre stili grafici predefiniti
  children: React.ReactNode;                    // Il contenuto testuale o le icone dentro al bottone
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className = "", ...props }) => {
  
  // Classi CSS strutturali comuni a tutte le varianti (es. padding, transizioni e animazione al click)
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform active:scale-95";
  
  // Classi CSS specifiche per cambiare i colori in base alla variante scelta
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30",
    secondary: "bg-white text-slate-900 hover:bg-gray-100",
    outline: "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
  };

  return (
    <button 
      // Uniamo le classi base, quelle della variante scelta e le eventuali classi extra passate dall'esterno (className)
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props} // Distribuisce tutte le restanti proprietà standard (es. onClick) direttamente sul tag button
    >
      {children}
    </button>
  );
};

export default Button;