"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-white/10 pb-20">
          <div className="mb-10 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Let&apos;s work <br /> <span className="text-gray-500">together.</span>
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Link href="/contact">
                    <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get in touch</span>
                        <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </button>
                </Link>
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-4 text-right">
             <motion.a 
                href="mailto:hello@signsoldesign.com" 
                className="text-2xl md:text-3xl hover:text-blue-500 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
             >
                hello@signsoldesign.com
             </motion.a>
             <motion.p
                className="text-gray-500"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
             >
                +91 9819334677
             </motion.p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          <div>
            <h4 className="text-gray-500 font-bold mb-6 uppercase tracking-wider text-sm">Sitemap</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/#home" },
                { name: "Services", href: "/services" },
                { name: "About", href: "/#about-grid" },
                { name: "Work", href: "/#selected-projects" },
                { name: "Contact", href: "/contact" }
              ].map((item, i) => (
                <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                  <Link href={item.href} className="text-lg hover:text-blue-500 transition-colors">{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-500 font-bold mb-6 uppercase tracking-wider text-sm">Socials</h4>
            <ul className="space-y-4">
              {["Instagram", "Twitter", "LinkedIn", "Behance"].map((item, i) => (
                <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a href="#" className="text-lg hover:text-blue-500 transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

           <div className="col-span-2 md:col-span-2">
            <h4 className="text-gray-500 font-bold mb-6 uppercase tracking-wider text-sm">Office</h4>
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl leading-relaxed max-w-sm"
            >
                Varun Arcade, Ghodbunder Road, <br />
                Manpada, Thane West, <br />
                Thane, Maharashtra, India
            </motion.p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© 2024 Signsol Design. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <h1 className="text-[15vw] font-black leading-none text-center whitespace-nowrap uppercase">
            Signsol Design
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
