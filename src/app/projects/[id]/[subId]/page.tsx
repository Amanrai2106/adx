"use client";
import React, { use } from "react";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";

export default function SubCategoryPage({ params }: { params: Promise<{ id: string; subId: string }> }) {
  const { id, subId } = use(params);
  const project = projects.find((p) => p.id === id);
  const subCategory = project?.subCategories?.find((s) => s.id === subId);

  if (!project || !subCategory) {
    notFound();
  }

  const subCategoryPosts = posts.filter(
    (p) => p.categoryId === id && p.subCategoryId === subId
  );

  return (
    <main className="bg-white min-h-screen text-black selection:bg-orange-500/30">
      <Nav />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-[95%] mx-auto">
             <TransitionLink href={`/projects/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Back to {project.title}</span>
             </TransitionLink>

             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-orange-600">
                <span>{project.title}</span>
                <span className="text-gray-300">/</span>
                <span>{subCategory.title}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black tracking-tight">
                {subCategory.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Explore our featured projects in {subCategory.title}.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="w-full max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {subCategoryPosts.length > 0 ? (
            subCategoryPosts.map((post, index) => (
              <TransitionLink key={post.id} href={`/projects/${id}/${subId}/${post.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-6 shadow-md hover:shadow-xl transition-all duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">
                          {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{post.description}</p>
                  </div>
                </motion.div>
              </TransitionLink>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl text-gray-400 mb-4">Coming Soon</p>
                <p className="text-gray-500">We are currently curating projects for this category.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
