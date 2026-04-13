import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Platform", links: ["Browse Movies", "TV Shows", "Trending Now", "Upcoming"] },
    { title: "Support", links: ["Help Center", "Terms of Use", "Privacy Policy", "Cookie Preferences"] },
    { title: "Company", links: ["About Us", "Contact", "Jobs", "Media Center"] },
  ];

  return (
    <footer className="w-full bg-[#1F1E24] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
         
          <div className="col-span-2 md:col-span-1 space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter text-white">
              CINE<span className="text-red-600 font-black">VERSE</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Ultimate cinematic experience at your fingertips. Watch trailers, discover trends, and stay updated with the movie world.
            </p>
            
           
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-[2px]">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-zinc-500 text-sm hover:text-red-600 hover:translate-x-2 transition-all duration-300 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-10"></div>

        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-600 text-[12px] font-medium uppercase tracking-widest">
            © {currentYear} MovieVerse. Built with ❤️ for Cinephiles.
          </div>

          
          <div className="flex bg-zinc-900/50 p-1 rounded-full border border-white/10 w-full max-w-md">
            <input 
              type="text" 
              placeholder="Get latest updates..." 
              className="bg-transparent border-none outline-none text-zinc-300 px-4 py-2 text-xs w-full"
            />
            <button className="bg-red-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;