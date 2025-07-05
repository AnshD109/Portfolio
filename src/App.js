  import { useRef } from 'react';
  import Lightning from './components/Lightning';
  import VariableProximity from './components/VariableProximity';
  import './App.css'; 

  function App() {
    // --- MOVE THIS LINE HERE ---
    const containerRef = useRef(null);

    return (
      <div className="App">
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
          <Lightning />
        </div>

        {/* This ref is now correctly defined before being used */}
        <div
          ref={containerRef}
          style={{position: 'relative'}}
        >
          
          <VariableProximity
            label={'Aspiring Data Scientist | Passionate About Machine Learning & AI '}
            className={'variable-proximity-demo'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 100, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff='linear'
          />
        </div>
        
      </div>
    );
  }

  export default App;