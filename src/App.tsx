
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { About } from './pages/About';
import { Other } from './pages/Other';
import { Projects } from './pages/Projects';


export function App() {
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              {/*<Route path="/other" element={<Other />} />*/}
            </Routes>
          </BrowserRouter>
      );
}
