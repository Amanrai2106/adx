"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 1. Main Dot (Fast response)
  const dotConfig = { damping: 35, stiffness: 2000, mass: 0.1 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  // 2. Trailing Ring (Smooth, laggy response)
  const ringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(mouseX, ringConfig);
  const ringY = useSpring(mouseY, ringConfig);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const manageMouseDown = () => setIsClicking(true);
    const manageMouseUp = () => setIsClicking(false);

    const manageMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.group') // For cards with group hover
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", manageMouseDown);
    window.addEventListener("mouseup", manageMouseUp);
    window.addEventListener("mouseover", manageMouseOver);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", manageMouseDown);
      window.removeEventListener("mouseup", manageMouseUp);
      window.removeEventListener("mouseover", manageMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Dot - Always visible, small */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-2.5 h-2.5 bg-orange-500 rounded-full pointer-events-none z-[10002]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing Ring - Expands on hover */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10001] border border-orange-500/50 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "rgba(249, 115, 22, 0.1)" : "transparent",
          borderColor: isHovered ? "transparent" : "rgba(249, 115, 22, 0.5)",
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 }
        }}
      />
    </>
  );
};

export default Cursor;
