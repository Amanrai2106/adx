"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const TimeDisplay = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <span suppressHydrationWarning>
      {time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
  );
};

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time ? time.getSeconds() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const hours = time ? time.getHours() : 0;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gray-800 bg-[#0a0a0a] shadow-2xl overflow-hidden">
      {/* Clock Face Markers - Responsive */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
          >
             <div className="w-1 h-3 bg-gray-600 mx-auto mt-2" />
          </div>
        ))}
      </div>
      
      {/* Center Dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-md" />

      {/* Hands Container - ensures centering */}
      <div className="absolute inset-0 z-10" style={{ opacity: time ? 1 : 0, transition: 'opacity 0.2s' }}>
          {/* Hour Hand */}
          <div
            className="absolute w-1.5 bg-white rounded-full"
            style={{
              height: "25%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`,
            }}
          />
          
          {/* Minute Hand */}
          <div
            className="absolute w-1 bg-gray-400 rounded-full"
            style={{
              height: "35%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${minutes * 6}deg)`,
            }}
          />
          
          {/* Second Hand */}
          <div
            className="absolute w-0.5 bg-orange-500 rounded-full"
            style={{
              height: "40%",
              bottom: "50%",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${seconds * 6}deg)`,
            }}
          />
      </div>
    </div>
  );
};

const MapVisualization = () => {
  return (
    <div className="relative w-full h-48 md:h-full opacity-30">
        {/* Simple Dot Map Representation */}
        <svg viewBox="0 0 800 400" className="w-full h-full text-gray-500 fill-current">
            {/* North America */}
            <circle cx="150" cy="100" r="2" /> <circle cx="160" cy="100" r="2" /> <circle cx="170" cy="110" r="2" />
            <circle cx="140" cy="110" r="2" /> <circle cx="150" cy="120" r="2" /> <circle cx="160" cy="130" r="2" />
            <circle cx="120" cy="100" r="2" /> <circle cx="130" cy="110" r="2" /> <circle cx="100" cy="90" r="2" />
            
            {/* South America */}
            <circle cx="200" cy="250" r="2" /> <circle cx="210" cy="260" r="2" /> <circle cx="220" cy="240" r="2" />
            <circle cx="200" cy="280" r="2" /> <circle cx="210" cy="290" r="2" /> <circle cx="190" cy="240" r="2" />

            {/* Europe */}
            <circle cx="400" cy="100" r="2" /> <circle cx="410" cy="90" r="2" /> <circle cx="420" cy="100" r="2" />
            <circle cx="390" cy="110" r="2" /> <circle cx="400" cy="120" r="2" /> <circle cx="430" cy="90" r="2" />

            {/* Africa */}
            <circle cx="400" cy="200" r="2" /> <circle cx="410" cy="210" r="2" /> <circle cx="420" cy="220" r="2" />
            <circle cx="390" cy="180" r="2" /> <circle cx="400" cy="250" r="2" /> <circle cx="430" cy="230" r="2" />

            {/* Asia */}
            <circle cx="550" cy="100" r="2" /> <circle cx="560" cy="110" r="2" /> <circle cx="570" cy="100" r="2" />
            <circle cx="580" cy="120" r="2" /> <circle cx="600" cy="130" r="2" /> <circle cx="620" cy="110" r="2" />
            <circle cx="540" cy="150" r="2" /> <circle cx="550" cy="160" r="2" /> <circle cx="530" cy="90" r="2" />

            {/* Australia */}
            <circle cx="650" cy="300" r="2" /> <circle cx="660" cy="310" r="2" /> <circle cx="670" cy="300" r="2" />
            <circle cx="640" cy="310" r="2" /> <circle cx="680" cy="320" r="2" />
        </svg>
    </div>
  )
}

const AboutGrid = () => {
  return (
    <section id="about-grid" className="bg-black text-white py-20 px-4 md:px-10 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 bg-[#0f0f0f] rounded-3xl p-8 border border-white/5 relative flex flex-col justify-between h-[300px] md:h-auto"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2 font-aboreto text-white">Signsol Design</h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              THANE, IN • <TimeDisplay />
            </p>
          </div>
          <div className="flex gap-4 mt-auto">
            <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <MailIcon />
            </div>
            <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <GithubIcon />
            </div>
            <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <XIcon />
            </div>
          </div>
        </motion.div>

        {/* Card 2: About Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 bg-[#0f0f0f] rounded-3xl p-8 border border-white/5"
        >
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Welcome to <strong className="text-white">Signsol Design</strong>, your premier destination for highly creative and professional signage design solutions. We collaborate with top <u className="decoration-gray-600">architectural companies</u> pan India and specialize in providing turn-key solutions for all your exterior and interior signage strategy and designing needs.
          </p>
          <p className="text-gray-400 mb-6 leading-relaxed">
             Our highly qualified and experienced team of visualizers, designers, and craftsmen are dedicated to creating <strong className="text-white">artistic yet functional designs</strong>. We excel in adapting our sign systems to perfectly match the &apos;look and feel&apos; of our client&apos;s brands.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Wayfinding", "Signage Strategy", "Experiential Design", "Turn-key Solutions", "Pan India", "Brand Adaptation"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 border border-white/5 hover:border-white/20 transition-colors cursor-default"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* Card 3: Design Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-3 bg-[#0f0f0f] rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden"
        >
          <div className="flex-1 z-10">
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
              Our Approach
            </p>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Meaningful <span className="text-blue-400 italic font-serif">connections.</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg">
              From Experiential Design to wayfinding, we design meaningful connections between people and places.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Turn-key Solutions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                System Production Efficiency
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Brand-Aligned Aesthetics
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center items-center">
             <Clock />
          </div>
        </motion.div>

        {/* Card 4: Pan India Presence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-3 bg-[#0f0f0f] rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          <div className="flex-1 z-10">
             <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
              Service Reach
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Collaborating with <br />
              <span className="text-gray-500">top architects</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg">
              We provide turn-key signage solutions for projects <u className="text-white decoration-gray-600">pan India</u>. From strategy to installation, we ensure your vision is executed flawlessly across any location.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-900/20 text-orange-400 rounded-full border border-orange-900/50 text-sm font-medium">
               <span className="w-4 h-4 rounded-full border border-orange-400/50 flex items-center justify-center">
                   <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
               </span>
               Nationwide Service
            </div>
          </div>
          <div className="flex-1 w-full h-full absolute right-0 top-0 md:relative md:w-auto md:h-auto opacity-20 md:opacity-100 pointer-events-none">
             <MapVisualization />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutGrid;
