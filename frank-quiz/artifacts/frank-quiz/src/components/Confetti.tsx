import React from "react";
import { motion } from "framer-motion";

export const Confetti = () => {
  const pieces = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"][Math.floor(Math.random() * 5)],
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: "-10%", left: `${p.x}%`, rotate: 0 }}
          animate={{
            top: "110%",
            left: `${p.x + (Math.random() * 20 - 10)}%`,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};
