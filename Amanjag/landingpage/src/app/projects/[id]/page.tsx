"use client";
import React, { use } from "react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-black min-h-screen text-white">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-white/20 pt-6"
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Client</h3>
            <p className="text-xl">Confidential</p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="border-t border-white/20 pt-6"
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Services</h3>
            <p className="text-xl">Wayfinding, Signage, Branding</p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="border-t border-white/20 pt-6"
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Year</h3>
            <p className="text-xl">2024</p>
          </motion.div>
        </div>

        <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">The Challenge</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Every space tells a story, but sometimes that story gets lost in translation. 
                        The challenge for {project.title} was to create a cohesive visual language that 
                        respected the architectural integrity while providing clear, intuitive guidance for users.
                        We needed to balance functionality with aesthetics, ensuring that every sign served a purpose 
                        without cluttering the visual landscape.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[400px] rounded-2xl overflow-hidden bg-white/5"
                >
                     <Image
                        src={project.src}
                        alt="Challenge details"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[400px] rounded-2xl overflow-hidden bg-white/5 order-2 md:order-1"
                >
                     <Image
                        src={project.src}
                        alt="Solution details"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">The Solution</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Our approach focused on material integration and high-contrast legibility. 
                        We utilized materials that complemented the existing environment—brushed metals, 
                        matte finishes, and illuminated elements where necessary. The typography was carefully 
                        selected to be modern yet timeless, ensuring readability from a distance while maintaining 
                        an elegant profile up close.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
