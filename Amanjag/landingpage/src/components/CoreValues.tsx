"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import Link from "next/link";

const CoreValues = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section id="services" ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-8 md:mb-16 text-center px-4 mx-auto z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Our Services
          </h2>
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">
            Comprehensive Design Solutions
          </p>
        </div>
        
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-8 md:px-20 w-max">
          {services.map((card) => (
            <div
              key={card.id}
              className="group relative h-[350px] w-[280px] md:h-[500px] md:w-[600px] flex-shrink-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2"
            >
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gradient-to-b from-neutral-900 to-black">
                   <h3 className="text-2xl md:text-4xl font-black uppercase text-white mb-6 leading-tight">{card.title}</h3>
                   <p className="text-gray-400 text-sm md:text-lg mb-10 max-w-sm hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     {card.description}
                   </p>
                   <Link href={`/services/${card.id}`}>
                     <button className="rounded-full bg-white px-8 py-4 text-xs md:text-sm font-bold text-black tracking-widest hover:bg-gray-200 transition-colors cursor-pointer relative z-10">
                         VIEW
                     </button>
                   </Link>
               </div>
            </div>
          ))}
        </motion.div>
        
        {/* Decorative circle removed as per user feedback */}
        {/* <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20">
             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div> */}
      </div>
    </section>
  );
};

export default CoreValues;
