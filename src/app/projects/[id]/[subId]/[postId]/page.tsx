"use client";
import React, { use, useRef } from "react";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GetInTouch from "@/components/GetInTouch";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, ArrowDown, MapPin, Calendar, Building2, Layers } from "lucide-react";

export default function ProjectPostPage({ params }: { params: Promise<{ id: string; subId: string; postId: string }> }) {
  const { id, subId, postId } = use(params);
  const post = posts.find((p) => p.id === postId);
  const project = projects.find((p) => p.id === id);
  const subCategory = project?.subCategories?.find((s) => s.id === subId);

  if (!post || !project || !subCategory) {
    notFound();
  }

  // Get related posts from the same subcategory, excluding current post
  const relatedPosts = posts.filter(
    (p) => p.subCategoryId === subId && p.id !== postId
  ).slice(0, 2);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Animation Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main ref={containerRef} className="bg-white min-h-screen text-black selection:bg-orange-500/30 overflow-hidden relative">
      <Nav />

      {/* Hero Section - Full Screen & Immersive */}
      <section className="relative w-full h-screen flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <TransitionLink 
            href={`/projects/${id}/${subId}`} 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 backdrop-blur-md w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-widest">Back to {subCategory.title}</span>
          </TransitionLink>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ y: textY }}
            className="max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6">
                 <span className="px-4 py-1.5 rounded-full bg-orange-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-600/20 border border-orange-500/50">
                  {project.title}
                </span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                <span className="text-white/90 text-sm font-medium uppercase tracking-widest">
                  {subCategory.title}
                </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1] text-white">
              {post.title}
            </motion.h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 right-10 z-10 hidden md:flex flex-col items-center gap-2 text-white/50"
        >
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent relative overflow-hidden">
                <motion.div 
                    animate={{ y: [-20, 20] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-white"
                />
            </div>
        </motion.div>
      </section>

      {/* Project Stats Bar - Properly Divided */}
      <section className="relative z-20 -mt-10 mx-6 md:mx-12">
        <div className="w-full max-w-[95%] mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <Building2 className="w-4 h-4 text-orange-500" />
                        <span>Client</span>
                    </div>
                    <p className="text-xl font-serif text-gray-900">Confidential</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span>Location</span>
                    </div>
                    <p className="text-xl font-serif text-gray-900">New Delhi</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>Year</span>
                    </div>
                    <p className="text-xl font-serif text-gray-900">2024</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <Layers className="w-4 h-4 text-orange-500" />
                        <span>Scope</span>
                    </div>
                    <p className="text-xl font-serif text-gray-900">End-to-End</p>
                </div>
            </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 md:py-32 px-6 md:px-12 w-full max-w-[95%] mx-auto">
        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
            <div className="lg:col-span-4 sticky top-32">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Project Overview</h2>
                <div className="h-1 w-20 bg-orange-500 mb-6" />
                <p className="text-gray-500 text-lg">
                    An in-depth look at how we transformed the vision into reality, focusing on functionality and aesthetic excellence.
                </p>
            </div>
            <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800 mb-10">
                    {post.description}
                </p>
                <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-loose">
                    <p>
                        This project represents a significant milestone in our {subCategory.title.toLowerCase()} portfolio. 
                        The primary objective was to create a cohesive environment that speaks to the users while maintaining 
                        high standards of durability and maintenance.
                    </p>
                    <p>
                        Our approach was holistic, considering every touchpoint from the entrance to the finest details. 
                        By integrating advanced fabrication techniques with traditional craftsmanship, we delivered a solution 
                        that stands the test of time.
                    </p>
                </div>
            </div>
        </div>

        {/* The Challenge - Split Layout */}
        <div className="bg-gray-50 rounded-[3rem] overflow-hidden mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 md:p-20 flex flex-col justify-center">
                    <span className="text-orange-600 font-mono text-sm tracking-widest uppercase mb-4">01. The Challenge</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-black">Navigating Complexity</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Every project comes with its unique set of constraints. For {post.title}, the main challenge was 
                        balancing the architectural integrity with the need for clear, functional signage and branding elements.
                    </p>
                    <ul className="space-y-4">
                        {['Strict architectural guidelines', 'High-traffic durability requirements', 'Complex wayfinding needs'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-[400px] lg:h-auto min-h-[500px]">
                    <Image
                        src={post.image}
                        alt="Challenge visual"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>
        </div>

        {/* Full Width Parallax Image */}
        <div className="w-full h-[60vh] md:h-[80vh] relative rounded-3xl overflow-hidden mb-32 group">
             <Image
                src={post.image}
                alt="Immersive View"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-700">
                <div className="bg-white/90 backdrop-blur-md px-10 py-6 rounded-full transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <span className="text-black font-bold tracking-widest uppercase text-sm">Immersive Experience</span>
                </div>
            </div>
        </div>

        {/* The Solution - Split Layout Reversed */}
        <div className="bg-black text-white rounded-[3rem] overflow-hidden mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[400px] lg:h-auto min-h-[500px] order-2 lg:order-1">
                    <Image
                        src={post.image}
                        alt="Solution visual"
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>
                <div className="p-12 md:p-20 flex flex-col justify-center order-1 lg:order-2">
                    <span className="text-orange-500 font-mono text-sm tracking-widest uppercase mb-4">02. The Solution</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Precision & Elegance</h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        We developed a comprehensive design language that utilizes premium materials and clean lines. 
                        The result is a system that not only guides users effectively but also enhances the overall 
                        aesthetic of the space.
                    </p>
                    <div className="grid grid-cols-2 gap-8 mt-4">
                        <div>
                            <span className="block text-3xl font-bold text-orange-500 mb-2">100%</span>
                            <span className="text-sm text-gray-400 uppercase tracking-widest">Custom Made</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-orange-500 mb-2">4 Weeks</span>
                            <span className="text-sm text-gray-400 uppercase tracking-widest">Turnaround</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedPosts.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
            <div className="w-full max-w-[95%] mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-2 block">More Projects</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black">Explore {subCategory.title}</h2>
                    </div>
                    <TransitionLink href={`/projects/${id}/${subId}`} className="hidden md:flex items-center gap-2 text-black font-bold hover:text-orange-600 transition-colors group">
                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </TransitionLink>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {relatedPosts.map((related) => (
                        <TransitionLink key={related.id} href={`/projects/${id}/${subId}/${related.id}`}>
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500">
                                    <Image
                                        src={related.image}
                                        alt={related.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                    
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-black">
                                            View Project
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-black group-hover:text-orange-600 transition-colors mb-2">{related.title}</h3>
                                <p className="text-gray-500 line-clamp-2">{related.description}</p>
                            </motion.div>
                        </TransitionLink>
                    ))}
                </div>
            </div>
        </section>
      )}

      <GetInTouch />
      <Footer hideContactCta={true} />
    </main>
  );
}
