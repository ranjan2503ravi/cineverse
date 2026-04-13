import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { IoPlaySharp, IoShieldCheckmarkSharp, IoFlashSharp } from "react-icons/io5";

const About = () => {
  return (
    
    <div className="bg-[#050505] text-white min-h-screen overflow-y-auto flex flex-col font-sans selection:bg-red-600/30">
      
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-red-600 transition-all duration-300">
            <HiArrowLeft size={18} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 group-hover:text-white hidden sm:inline">Exit</span>
        </Link>
        <div className="text-red-600 font-black italic tracking-tighter text-xl">C<span className="text-white">V.</span></div>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row pt-24 md:pt-0">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-[45%] p-8 md:p-16 lg:p-24 flex flex-col justify-center relative min-h-[60vh] md:min-h-screen"
        >
         
          <div className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[150px] md:text-[300px] font-black text-white/[0.02] select-none pointer-events-none hidden sm:block">
            CINE
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 italic z-10"
          >
            STORY <br /> <span className="text-red-600">UNFOLDED.</span>
          </motion.h1>
          
          <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed mb-8 border-l-2 border-red-600 pl-4 z-10">
            Cineverse is a high-performance movie ecosystem designed for the next generation of cinema lovers. Pure speed. Zero noise. Built with precision for impact.
          </p>

          <div className="flex gap-4 z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-lg shadow-red-600/20"
            >
              Explore App
            </motion.button>
          </div>
        </motion.div>

        
        <div className="w-full md:w-[55%] bg-[#080808] p-8 md:p-16 lg:p-24 flex items-center min-h-[50vh] md:min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1 sm:col-span-2 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group"
            >
              <h3 className="text-xs uppercase tracking-widest text-red-600 font-bold mb-3">Our Vision</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                Bhai, Cineverse ko maine React aur Tailwind se optimize kiya hai taaki users ko seamless experience mile. Har transition aur har animation ko GSAP aur Framer Motion se refine kiya hai. It's not just a site, it's a statement of performance and aesthetics.
              </p>
            </motion.div>

          
            <StatCard icon={<IoPlaySharp size={20}/>} title="4K HDR" desc="Adaptive streaming tech for pixel-perfect clarity." delay={0.2} />
            
            <StatCard icon={<IoFlashSharp size={20}/>} title="FAST" desc="Optimized SSR and pre-fetching for under 2s load time." delay={0.3} />
            
            <StatCard icon={<IoShieldCheckmarkSharp size={20}/>} title="SECURE" desc="End-to-end encryption for your personal watchlists." delay={0.4} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 flex flex-col justify-center items-start sm:items-center border border-dashed border-white/10 rounded-3xl"
            >
               <span className="text-4xl md:text-5xl font-black text-red-600 italic">10K+</span>
               <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Titles Database</span>
            </motion.div>

          </div>
        </div>
      </main>

      
      <footer className="p-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 bg-[#050505]">
        <p className="text-[10px] uppercase tracking-widest text-gray-600 text-center">© 2026 Cineverse Labs • Crafting Cinematic Experiences</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300">Instagram</a>
        </div>
      </footer>

    </div>
  );
};

const StatCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl flex flex-col gap-4 group hover:border-red-600/50 transition-all cursor-default"
  >
    <div className="text-red-600 group-hover:scale-110 transition-transform duration-500 bg-red-600/10 w-fit p-3 rounded-2xl">
      {icon}
    </div>
    <div>
      <h4 className="text-[12px] font-bold uppercase tracking-widest mb-2 text-white">{title}</h4>
      <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{desc}</p>
    </div>
  </motion.div>
);

export default About;