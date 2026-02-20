import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Crear partículas aleatorias
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
        size: 4 + Math.random() * 8,
      }));
      setParticles(newParticles);
    };

    generateParticles();

    // Regenerar partículas cada 4 segundos
    const interval = setInterval(generateParticles, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 0.6, 0], y: window.innerHeight + 100 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeIn",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
