"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: "Home", href: "/#home" },
    { name: "Work", href: "/#selected-projects" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/#about-grid" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 left-0 right-0 z-[9999] px-6 md:px-12 py-5 flex justify-between items-center bg-black border-b border-white/5"
    >
      {/* Logo */}
      <Link href="/">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tighter uppercase text-white cursor-pointer"
        >
          Signsol<span className="text-gray-500">.</span>
        </motion.div>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10 items-center">
        {links.map((link, i) => (
          <motion.li 
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative group overflow-hidden cursor-pointer"
          >
            <Link href={link.href} className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
              <span className="block translate-y-0 group-hover:-translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                {link.name}
              </span>
              <span className="absolute top-0 left-0 block translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-white">
                {link.name}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block"
      >
        <Link href="/contact">
            <button className="relative px-6 py-2.5 rounded-full border border-white/20 text-white text-xs font-bold tracking-widest uppercase overflow-hidden group">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Let&apos;s Talk</span>
                <div className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
            </button>
        </Link>
      </motion.div>

      {/* Mobile Menu Icon (Simplified) */}
      <div className="md:hidden text-white cursor-pointer">
        <div className="space-y-1.5">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white ml-auto"></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
