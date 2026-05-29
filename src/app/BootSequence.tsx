'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair } from 'lucide-react';

// --- CONSTELLATION MAP DATA ---
const nodes = [
  { id: 1, x: 180, y: 60, size: 2 },  // N Luzon
  { id: 2, x: 220, y: 90, size: 1.5 }, // NE Luzon
  { id: 3, x: 170, y: 120, size: 2 }, // Central Luzon
  { id: 4, x: 190, y: 150, size: 4, isTarget: true }, // MANILA (Target)
  { id: 5, x: 230, y: 180, size: 2 }, // S Luzon
  { id: 6, x: 270, y: 220, size: 2.5 }, // Bicol
  { id: 7, x: 170, y: 210, size: 1.5 }, // Mindoro
  { id: 8, x: 110, y: 280, size: 2 }, // Palawan N
  { id: 9, x: 70, y: 350, size: 2.5 },  // Palawan S
  { id: 10, x: 200, y: 260, size: 2 }, // Panay
  { id: 11, x: 240, y: 280, size: 3 }, // Cebu/Negros
  { id: 12, x: 290, y: 250, size: 2 }, // Samar/Leyte
  { id: 13, x: 260, y: 330, size: 2.5 }, // N Mindanao
  { id: 14, x: 310, y: 360, size: 2 }, // E Mindanao
  { id: 15, x: 230, y: 380, size: 2 }, // W Mindanao
  { id: 16, x: 280, y: 410, size: 3 }, // S Mindanao
];

// Reordered the edges to trace from the outside edges of the country INWARD towards Manila
const edges = [
  [1,2], [8,9], [15,16], [14,16], // Outer edges start
  [1,3], [2,3], [7,8], [13,15], [13,14], [12,14], // Moving in
  [11,13], [11,12], [6,12], // Visayas
  [10,11], [5,6], // Moving up
  [5,10], [4,7], // Closing in
  [3,4], [4,5] // Connecting directly to Manila
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Luxury Timing Sequence
    const t1 = setTimeout(() => setPhase(1), 800);  // Begin Tracing Network
    const t2 = setTimeout(() => setPhase(2), 4000); // Network fully traced, lock on Manila
    const t3 = setTimeout(() => setPhase(3), 5000); // Execute Zoom
    const t4 = setTimeout(() => onComplete(), 6000); // Unmount

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        key="boot-screen"
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-hidden font-sans"
      >
        {/* Subtle Luxury Gradient Void */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_80%)] pointer-events-none" />

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          
          {/* HIGH-END TERMINAL LOGS */}
          <div className="absolute top-12 left-12 text-[10px] sm:text-xs text-slate-500 space-y-2 z-20 font-mono tracking-widest uppercase">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Sovereign_OS // v2.4.1</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Establishing Neural Grid...</motion.p>
            {phase >= 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300">Tracing Geographic Topology...</motion.p>}
            {phase >= 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#D4AF37] font-bold">ARCHITECT LOCATED.</motion.p>}
          </div>

          {/* MASSIVE CONSTELLATION MAP */}
          {/* Increased size significantly: uses w-[600px] to w-[800px] depending on screen */}
          <motion.div 
            animate={
              phase === 3 ? { scale: 40, opacity: 0 } : // Aggressive zoom past camera
              phase === 2 ? { scale: 1.05 } : // Subtle lock-on pulse
              { scale: 1 }
            }
            transition={{ duration: phase === 3 ? 1.5 : 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "47.5% 30%" }} // Stays locked exactly on Node 4 (Manila)
            className="relative w-full max-w-[600px] md:max-w-[800px] aspect-[4/5]"
          >
            {/* The SVG Network uses the same 400x500 coordinates, but scales to fit the massive container */}
            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              
              {/* Luxury White/Gold Glow Filter */}
              <defs>
                <filter id="luxury-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* TRACING THE EDGES */}
              {edges.map((edge, i) => {
                const n1 = nodes.find(n => n.id === edge[0]);
                const n2 = nodes.find(n => n.id === edge[1]);
                if (!n1 || !n2) return null;
                return (
                  <motion.line 
                    key={`edge-${i}`}
                    x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                    stroke="rgba(255,255,255,0.15)" 
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                    // Staggered delay draws the lines from the outside in
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "easeInOut" }}
                  />
                );
              })}

              {/* POPPING THE NODES */}
              {nodes.map((node, i) => (
                <motion.circle 
                  key={`node-${node.id}`}
                  cx={node.x} cy={node.y} r={node.size * 0.8}
                  fill={node.isTarget && phase >= 2 ? "#D4AF37" : "#FFFFFF"} // #D4AF37 is classic Luxury Gold
                  filter="url(#luxury-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    phase >= 1 
                      ? (node.isTarget && phase >= 2 
                          ? { scale: [1, 2.5, 1.5], opacity: 1 } 
                          : { scale: 1, opacity: 0.6 })
                      : {}
                  }
                  // Nodes appear slightly after the lines start tracing
                  transition={{ 
                    duration: node.isTarget && phase >= 2 ? 0.8 : 0.5, 
                    delay: node.isTarget && phase >= 2 ? 0 : 1 + (i * 0.05),
                    ease: "easeOut"
                  }}
                />
              ))}
            </svg>

            {/* GOLDEN CROSSHAIR (Fades in directly on Manila) */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 3, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  // Absolute positioned exactly over Node 4 (Manila: 47.5% x 30%)
                  className="absolute top-[30%] left-[47.5%] -ml-[24px] -mt-[24px] flex items-center justify-center text-[#D4AF37] z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                >
                  <Crosshair size={48} strokeWidth={0.5} className="animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ELEGANT LOCK-ON HUD */}
          <AnimatePresence>
            {phase >= 2 && phase < 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-20 flex flex-col items-center z-30"
              >
                <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-white mb-2">
                  TARGET LOCKED
                </h2>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4" />
                <p className="text-xs text-slate-400 font-mono tracking-[0.4em] uppercase">
                  Coordinates // Manila, PH
                </p>
                <p className="text-xs text-[#D4AF37] font-mono tracking-widest uppercase mt-2 font-light">
                  Status: Systems Online
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

