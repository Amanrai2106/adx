"use client";
import React, { use, useRef } from "react";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const projectPosts = posts.filter(p => p.categoryId === id);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="bg-white min-h-screen text-black selection:bg-orange-500/30 overflow-hidden relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-purple-100/40 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] bg-blue-100/40 rounded-full blur-[120px] opacity-50" />
      </div>

      <Nav />
      
      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[80vh] flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.9] text-black">
                {project.title}
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-800 max-w-2xl leading-relaxed font-medium bg-white/50 backdrop-blur-md p-4 rounded-xl"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative z-10 py-32 px-6 md:px-12 w-full mx-auto">
        <div className="space-y-32">
            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">The Challenge</h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                        Every space tells a story, but sometimes that story gets lost in translation. 
                        The challenge for {project.title} was to create a cohesive visual language that 
                        respected the architectural integrity while providing clear, intuitive guidance for users.
                    </p>
                    <div className="h-px w-20 bg-black/20" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-gray-200"
                >
                     <Image
                        src={project.src}
                        alt="Challenge details"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-[1.5s] ease-out"
                      />
                </motion.div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] rounded-2xl overflow-hidden order-2 md:order-1 shadow-2xl shadow-gray-200"
                >
                     <Image
                        src={project.src}
                        alt="Solution details"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-[1.5s] ease-out"
                      />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black">The Solution</h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                        Our approach focused on material integration and high-contrast legibility. 
                        We utilized materials that complemented the existing environment—brushed metals, 
                        matte finishes, and illuminated elements where necessary.
                    </p>
                    <div className="h-px w-20 bg-black/20" />
                </motion.div>
            </div>
        </div>
      </section>

      {/* Full Width Image Parallax */}
      <section className="relative w-full h-[80vh] overflow-hidden my-20">
         <motion.div 
            style={{ scale: useTransform(scrollYProgress, [0.4, 1], [1, 1.2]) }}
            className="absolute inset-0"
         >
             <Image
                src={project.src}
                alt="Full width view"
                fill
                className="object-cover"
             />
         </motion.div>
         <div className="absolute inset-0 flex items-center justify-center bg-black/10">
             <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-bold text-center text-white drop-shadow-xl"
             >
                 {project.title}
             </motion.h3>
         </div>
      </section>

      {/* Subcategories Section */}
      <section className="relative z-10 py-24 px-6 md:px-12 w-full mx-auto bg-white/80 backdrop-blur-sm">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold mb-16 text-orange-600 uppercase tracking-widest flex items-center gap-4"
        >
          <span className="w-8 h-[1px] bg-orange-600"></span>
          Explore Categories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.subCategories?.map((sub, index) => (
            <TransitionLink key={sub.id} href={`/projects/${project.id}/${sub.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500"
              >
                <Image
                  src={sub.image}
                  alt={sub.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {sub.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="text-sm font-medium uppercase tracking-wider">View Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* Featured Projects Demo Section */}
      {projectPosts.length > 0 && (
        <section className="relative z-10 py-24 px-6 md:px-12 w-full mx-auto border-t border-black/5">
          <div className="flex justify-between items-end mb-16">
             <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-orange-600 uppercase tracking-widest flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-orange-600"></span>
              Featured Projects
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projectPosts.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
                      {project.subCategories?.find(s => s.id === post.subCategoryId)?.title || 'Project'}
                    </span>
                   </div>
                  <h3 className="text-2xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}



      {/* Next/Prev Navigation */}
      <section className="relative z-10 py-20 px-6 md:px-12 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <TransitionLink href={`/projects/${prevProject.id}`} className="group flex items-center gap-4 text-gray-500 hover:text-black transition-colors">
                <ArrowLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                <div className="text-right md:text-left">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">Previous Project</p>
                    <h4 className="text-2xl font-bold">{prevProject.title}</h4>
                </div>
            </TransitionLink>
            
            <div className="h-12 w-px bg-black/10 hidden md:block"></div>

            <TransitionLink href={`/projects/${nextProject.id}`} className="group flex items-center gap-4 text-gray-500 hover:text-black transition-colors text-right">
                <div className="text-left md:text-right">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">Next Project</p>
                    <h4 className="text-2xl font-bold">{nextProject.title}</h4>
                </div>
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </TransitionLink>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 text-center bg-gray-50 border-t border-black/5">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Ready to start your project?</h2>
            <Button href={`/contact?category=Project&subcategory=${encodeURIComponent(project.title)}`} variant="primary" className="text-lg px-12 py-6">
                Get in Touch
            </Button>
        </motion.div>
      </section>
      
      <Footer hideContactCta={true} />
    </main>
  );
}
