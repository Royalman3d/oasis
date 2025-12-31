import { useEffect, useState } from "react";
import DisplayA from "./pages/Display";
import Intro from "./pages/Intro";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"
        }`}>
        <DisplayA />
      </div>

      <div className={`absolute inset-0 z-10 transition-all duration-1000 ${showIntro ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
        }`}>
        <Intro />
      </div>
    </div>
  );
}

export default App;