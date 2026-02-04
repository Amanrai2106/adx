'use client';

import React, { use } from 'react';
import { motion, Variants } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    notFound();
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Nav />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 border-b border-white/10 pb-20"
          >
            <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
                    {service.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                    {service.description}
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                        <span className="text-xs font-bold">0{service.id}</span>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-8 text-white"
              >
                What We Offer
              </motion.h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {service.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center group cursor-default"
                  >
                    <span className="w-12 h-[1px] bg-white/20 mr-6 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-300"></span>
                    <span className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-neutral-900 rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500"></div>
                
                <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
                    <p className="text-gray-400 mb-8">
                        Let&apos;s discuss how we can implement {service.title.toLowerCase()} for your next project.
                    </p>
                </div>

                <Link href="/contact">
                    <button className="w-full py-4 bg-white text-black rounded-full font-bold tracking-widest hover:bg-gray-200 transition-colors">
                        GET IN TOUCH
                    </button>
                </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
