import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// React Icons
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

const Contact = () => {
  return (
    // min-h-screen aur overflow-y-auto add kiya taaki layout na tute
    <div className="bg-[#050505] text-white min-h-screen overflow-y-auto flex flex-col font-sans selection:bg-red-600 custom-scrollbar">
      
      {/* --- MINIMAL BACK NAV --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none">
        <Link to="/" className="inline-flex items-center gap-2 group transition-all duration-300">
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
            <BiArrowBack size={18} className="text-white" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 group-hover:text-white hidden sm:inline">Home</span>
        </Link>
      </nav>

      {/* --- MAIN CONTACT SECTION --- */}
      <main className="flex-1 flex flex-col md:flex-row pt-24 md:pt-0">
        
        {/* LEFT SIDE: Typography & Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-[45%] p-8 md:p-16 lg:p-24 flex flex-col justify-center border-r border-white/5 bg-gradient-to-br from-[#080808] to-black min-h-[50vh] md:min-h-screen"
        >
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            Connect With Us
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-none mb-8">
            LET'S <br /> <span className="text-red-600">TALK.</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed mb-12 border-l-2 border-red-600/30 pl-4">
            Interviewer bhai, Cineverse ki scalability ya partnership par baat karni ho? Just drop a message. We reply in seconds.
          </p>

          <div className="space-y-8">
            <ContactInfo icon={<MdEmail size={20}/>} text="ranjan2503ravi@gmail.com" label="Email" />
            <ContactInfo icon={<MdPhone size={20}/>} text="+91 7979056132" label="Direct Line" />
            <ContactInfo icon={<MdLocationOn size={20}/>} text="Mumbai, Digital Space" label="Base" />
          </div>
        </motion.div>

        {/* RIGHT SIDE: Premium Glass Form */}
        <div className="w-full md:w-[55%] p-8 md:p-16 lg:p-24 flex items-center justify-center relative overflow-hidden min-h-[70vh] md:min-h-screen">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-lg bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative z-10 hover:border-white/20 transition-all duration-500"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputGroup label="Name" type="text" placeholder="Raviranjan Kumar Singh" />
                <InputGroup label="Subject" type="text" placeholder="UI Feedback" />
              </div>
              
              <InputGroup label="Email Address" type="email" placeholder="ranjan2503@gmail.com" />
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-red-600 transition-all text-sm resize-none placeholder:text-gray-700"
                  placeholder="Type your cinematic thoughts..."
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20"
              >
                Send Message <IoSendSharp className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </main>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="p-8 md:px-16 flex flex-col md:row justify-between items-center border-t border-white/5 text-[9px] uppercase tracking-[0.3em] text-gray-600 gap-4 bg-[#050505]">
        <p>© 2026 Cineverse Labs</p>
        <p className="hidden md:block">Performance Oriented Cinematic Interface</p>
        <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
        </div>
      </footer>
    </div>
  );
};

// Helper Components (Same as before but with better padding/sizing)
const ContactInfo = ({ icon, text, label }) => (
  <div className="flex items-center gap-6 group cursor-pointer">
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-xl">
      {icon}
    </div>
    <div>
      <p className="text-[9px] uppercase font-bold text-gray-600 tracking-widest mb-1">{label}</p>
      <p className="text-sm md:text-base font-bold tracking-tight group-hover:text-red-500 transition-colors">{text}</p>
    </div>
  </div>
);

const InputGroup = ({ label, type, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-red-600 transition-all text-sm placeholder:text-gray-700"
    />
  </div>
);

export default Contact;