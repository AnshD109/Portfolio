import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Intro from "./components/Intro";
import { BackgroundBeams } from "./components/ui/background-beams";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Intro onClose={() => setShowIntro(false)} />
      ) : (
        <BrowserRouter>
          <div className='relative z-0 bg-primary'>
            <div>
              <Navbar />
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
          </div>
          <BackgroundBeams />
        </BrowserRouter>
        
      )}
    </>
  );
}

export default App;
