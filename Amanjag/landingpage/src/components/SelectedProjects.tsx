"use client";
import React from "react";
import { motion } from "framer-motion";

const SelectedProjects = () => {
  return (
    <div id="selected-projects" className="w-full py-20 bg-black overflow-hidden flex flex-col justify-center relative z-[999]">
      <div className="flex whitespace-nowrap">
        <MarqueeItem />
        <MarqueeItem />
      </div>
    </div>
  );
};

const MarqueeItem = () => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex flex-shrink-0 items-center"
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center">
          <span className="text-7xl md:text-9xl font-black text-transparent px-8 tracking-tighter" style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)" }}>
            SELECTED PROJECTS
          </span>
          <span className="text-4xl md:text-6xl text-blue-500 px-8">★</span>
        </div>
      ))}
    </motion.div>
  );
};

export default SelectedProjects;
