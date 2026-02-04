'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';

export default function ServicesPage() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/20">
      <Nav />
      
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            OUR SERVICES
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive signage and branding solutions designed to elevate your business presence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-neutral-700 transition-colors duration-300"
            >
              <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
