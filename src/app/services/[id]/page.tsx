'use client';

import React, { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    notFound();
  }

  // State for filtering
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter posts belonging to this service
  const servicePosts = posts.filter(p => p.categoryId === id);

  // Apply subcategory filter
  const filteredPosts = activeFilter === 'all' 
    ? servicePosts 
    : servicePosts.filter(p => p.subCategoryId === activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen text-black selection:bg-orange-500/30 overflow-x-hidden relative">
      <Nav />
      
      <main className="relative z-10 pt-32 pb-20">
        <div className="w-full mx-auto px-6 md:px-12">
          
          {/* Header & Filter Section */}
          <div className="mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
            >
              {service.title}
            </motion.h1>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 md:gap-4 pb-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        activeFilter === 'all' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-transparent text-gray-500 border-gray-300 hover:border-black hover:text-black'
                    }`}
                >
                    All
                </button>
                {service.subCategories?.map((sub) => (
                    <button
                        key={sub.id}
                        onClick={() => setActiveFilter(sub.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeFilter === sub.id 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-gray-500 border-gray-300 hover:border-black hover:text-black'
                        }`}
                    >
                        {sub.title}
                    </button>
                ))}
            </div>
          </div>

          {/* Posts Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[50vh]"
          >
            <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => {
                    const subCategoryTitle = service.subCategories?.find(s => s.id === post.subCategoryId)?.title;
                    
                    return (
                        <motion.div
                            key={post.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TransitionLink 
                                href={`/services/${id}/${post.subCategoryId}/${post.id}`}
                                className="group block relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-200"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                        <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {subCategoryTitle}
                                        </p>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-4 border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                            <span className="text-gray-200 text-sm line-clamp-1">{post.description}</span>
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TransitionLink>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center text-gray-500">
                <p>No projects found in this category yet.</p>
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-32 relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-12 md:p-24 text-center shadow-xl shadow-gray-200/50">
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black">
                    Ready to transform your space?
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    Let&apos;s collaborate to bring the vision of indoor signs to life with precision and creativity.
                </p>
                <Button 
                    href="/contact"
                    className="h-14 px-8 rounded-full text-base bg-black text-white hover:bg-gray-800 border-none"
                    variant="outline"
                >
                    Get in Touch
                </Button>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-orange-100 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-blue-100 rounded-full blur-[100px]" />
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
