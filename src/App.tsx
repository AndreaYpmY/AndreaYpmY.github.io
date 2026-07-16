/**
 * COMPONENTE: App.tsx
 * 
 * L'entry point principale dell'applicazione React. 
 * Il suo scopo è definire la struttura globale della pagina (il layout di base, lo sfondo, il footer), 
 * importare i dati statici dal file JSON (content.json) tipizzandoli correttamente, 
 * e assemblare le varie sezioni del portfolio (Navbar, Hero, About, Progetti, ecc.) passandogli i dati necessari.
 */

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Footer from "./components/layout/Footer";


// Importazione dei tipi TypeScript e del file JSON con le informazioni del portfolio
import type { PortfolioData } from "./types";
import data from "./data/content.json";

// Forziamo TypeScript a riconoscere il file JSON secondo l'interfaccia definita in types
const portfolio = data as PortfolioData;

function App() {
  return (
    // Contenitore principale con lo stile di base globale (colore di sfondo scuro e selezione testo personalizzata)
    <div className="bg-slate-900 min-h-screen text-slate-200 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar per la navigazione del sito */}
      <Navbar />

      {/* Area principale del portfolio, centrata e con padding laterale */}
      <main className="container mx-auto px-6">
        
        {/* Sezione introduttiva a cui vengono passati i dati specifici estratti dal JSON */}
        <Hero data={portfolio.hero} />

        {/* Sezione 'Chi sono' */}
        <About data={portfolio.about} />

        {/* Sezione skills con le competenze raggruppate per categoria */}
        <Skills data={portfolio.skills} />

        {/* Sezione timeline con il percorso accademico e professionale */}
        <Education data={portfolio.education} />

        {/* Sezione 'Progetti' con la lista dei progetti realizzati */}
        <Projects data={portfolio.projects} />

      </main>

      {/* Footer a fondo pagina con l'anno corrente generato dinamicamente 
      <footer className="py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Andrea Y. Built with React & Tailwind.
      </footer>*/}
      <Footer data={portfolio.hero.socials} authorName={portfolio.hero.name} />
      
    </div>    
  );
}

export default App;