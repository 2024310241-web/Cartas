import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Letter from "./components/Letter";
import MusicPlayer from "./components/MusicPlayer";
import Particles from "./components/Particles";
import { letters } from "./data/letters";
import "./index.css";

function App() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const nextLetter = () => {
    if (index < letters.length - 1) setIndex(index + 1);
  };

  const prevLetter = () => {
    if (index > 0) setIndex(index - 1);
  };

  // Detección de swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart.current || !touchEnd.current) return;
    
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextLetter();
    } else if (isRightSwipe) {
      prevLetter();
    }
  };

  // Teclado (flechas)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") nextLetter();
      if (e.key === "ArrowLeft") prevLetter();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [index, letters.length]);

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Particles />
      <MusicPlayer />
      
      <AnimatePresence mode="wait">
        <Letter
          key={letters[index].id}
          title={letters[index].title}
          content={letters[index].content}
          image={letters[index].image}
          type={letters[index].type}
        />
      </AnimatePresence>

      <motion.div 
        className="nav-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button 
          onClick={prevLetter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={index === 0}
          style={{ opacity: index === 0 ? 0.5 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Anterior
        </motion.button>
        <motion.button 
          onClick={nextLetter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={index === letters.length - 1}
          style={{ opacity: index === letters.length - 1 ? 0.5 : 1, cursor: index === letters.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          Siguiente →
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;