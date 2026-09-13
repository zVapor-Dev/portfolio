import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 min-h-screen bg-vapor-bg">
        <div className="pointer-events-none fixed inset-0 z-0">
          <StarsCanvas />
        </div>

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Tech />
          <Works />
          <Contact />

          <footer className="border-t border-white/[0.06] px-5 py-8 text-center sm:px-8 lg:px-12">
            <p className="font-mono text-xs text-vapor-muted">
              © {new Date().getFullYear()} Daan Vrieling · zVapor_
            </p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
