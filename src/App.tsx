/**
 * Componente App.
 * Entry point dell'applicazione. Definisce il layout globale, 
 * importa i dati dal JSON e renderizza le varie sezioni.
 */

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Footer from "./components/layout/Footer";

import type { PortfolioData } from "./types";
import data from "./data/content.json";

const portfolio = data as PortfolioData;

function App() {
  return (
    // Aggiunto overflow-x-hidden e relative w-full per bloccare lo sbordamento delle luci di sfondo
    <div className="relative w-full overflow-x-hidden bg-slate-900 min-h-screen text-slate-200 selection:bg-indigo-500 selection:text-white">
      
      <Navbar />

      <main className="container mx-auto px-6">
        <Hero data={portfolio.hero} />
        <About data={portfolio.about} />
        <Skills data={portfolio.skills} />
        <Education data={portfolio.education} />
        <Projects data={portfolio.projects} />
      </main>

      <Footer data={portfolio.hero.socials} authorName={portfolio.hero.name} />
      
    </div>    
  );
}

export default App;