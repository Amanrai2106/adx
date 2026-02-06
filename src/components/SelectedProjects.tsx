"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SelectedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div 
      ref={containerRef}
      id="selected-projects" 
      className="w-full py-20 bg-white overflow-hidden flex flex-col justify-center relative z-[999]"
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </motion.div>
    </div>
  );
};

const MarqueeContent = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <div className="flex items-center">
        <span className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent px-4 md:px-8 tracking-tighter" style={{ WebkitTextStroke: "1px rgba(0, 0, 0, 0.5)" }}>
          SELECTED PROJECTS
        </span>
        <span className="text-3xl md:text-6xl text-blue-500 px-4 md:px-8">★</span>
      </div>
    </div>
  );
};

export default SelectedProjects;
