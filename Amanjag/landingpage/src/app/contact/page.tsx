"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for reaching out! We will get back to you soon.");
  };

  const inputVariants: Variants = {
    focus: { scale: 1.02, borderColor: "#3b82f6", transition: { duration: 0.3 } },
    blur: { scale: 1, borderColor: "rgba(255,255,255,0.1)", transition: { duration: 0.3 } },
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <Nav />
      <div className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Left Side: Text Content */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10">
            Let&apos;s start a <br />
            <span className="text-gray-500">conversation.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-md leading-relaxed mb-10">
            Interested in working together? Fill out the form below with some info about your project and we will get back to you as soon as we can.
          </p>
          
          <div className="space-y-6">
             <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Email</h3>
                <a href="mailto:hello@signsoldesign.com" className="text-2xl hover:text-blue-500 transition-colors">hello@signsoldesign.com</a>
             </div>
             <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Phone</h3>
                <p className="text-2xl">+91 9819334677</p>
             </div>
             <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Address</h3>
                <p className="text-xl text-gray-400">
                    Varun Arcade, Ghodbunder Road, <br />
                    Manpada, Thane West, <br />
                    Thane, Maharashtra, India
                </p>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Animated Form */}
        <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex-1 bg-[#0f0f0f] p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">What&apos;s your name?</label>
              <motion.input
                whileFocus="focus"
                initial="blur"
                variants={inputVariants}
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-gray-700 focus:outline-none"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">What&apos;s your email?</label>
              <motion.input
                whileFocus="focus"
                initial="blur"
                variants={inputVariants}
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-gray-700 focus:outline-none"
              />
            </div>

             <div className="group">
              <label htmlFor="subject" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">What&apos;s this regarding?</label>
              <motion.input
                whileFocus="focus"
                initial="blur"
                variants={inputVariants}
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="New Project, Partnership, etc."
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-gray-700 focus:outline-none"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-blue-500 transition-colors">Tell us about your project</label>
              <motion.textarea
                whileFocus="focus"
                initial="blur"
                variants={inputVariants}
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello, I'm looking to..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-gray-700 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-6">
                <button type="submit" className="group relative w-full py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send Message</span>
                    <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                </button>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
