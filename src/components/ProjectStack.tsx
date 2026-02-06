"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";

import { Button } from "@/components/ui/Button";

const Card = ({
  i,
  title,
  description,
  src,
  color,
  progress,
  range,
  targetScale,
  id,
}: {
  i: number;
  title: string;
  description: string;
  src: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  id: string;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-auto md:h-[500px] w-full md:w-[1000px] rounded-[25px] p-6 md:p-12 origin-top border border-black/10 overflow-hidden shadow-2xl will-change-transform"
      >
        <div className="flex flex-col md:flex-row h-full gap-6 md:gap-12">
          <div className="w-full md:w-[40%] flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black">{title}</h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed">{description}</p>
            <div className="mt-6 md:mt-8">
              <Button 
                href={`/projects/${id}`}
                variant="outline"
                className="text-xs px-6 py-3 w-full md:w-auto border-black/30 text-black hover:bg-black hover:text-white"
              >
                VIEW PROJECTS
              </Button>
            </div>
          </div>

          <div className="relative w-full md:w-[60%] h-[200px] md:h-full rounded-[20px] overflow-hidden bg-white/50 order-1 md:order-2">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <Image 
                fill 
                src={src} 
                alt={title} 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectStack = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="project-stack" ref={container} className="bg-white relative px-4">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default ProjectStack;
