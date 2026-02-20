import { motion } from "framer-motion";

export default function Letter({ title, content, image, type }) {
  const isCover = type === "cover";

  return (
    <motion.div
      className={`letter-card ${isCover ? "cover-card" : ""}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
    >
      {isCover ? (
        <>
          {image && (
            <motion.img
              src={image}
              alt="Portada"
              className="cover-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          )}
          <motion.h2
            className="cover-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="cover-author"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Hecho con amor,<br />Joshua
          </motion.p>
        </>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {content}
          </motion.p>
        </>
      )}
    </motion.div>
  );
}