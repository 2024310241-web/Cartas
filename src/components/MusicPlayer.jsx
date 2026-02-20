import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play con sonido muteado al principio
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Si falla, el usuario deberá hacer click
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="music-player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <audio 
        ref={audioRef} 
        loop
        src={encodeURI('/music/until I found you · Stephen Sanchez ft. em beihold ｜｜ sub. español (lyrics).mp3')}
      >
        {/* Usa la canción que está en public/music */}
      </audio>
      
      <motion.button
        onClick={toggleMusic}
        className="music-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? "🔊" : "🔇"}
      </motion.button>
    </motion.div>
  );
}
