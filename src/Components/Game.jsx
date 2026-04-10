import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiSearch, HiStar, HiOutlineDesktopComputer } from "react-icons/hi";
import { FaPlaystation, FaXbox, FaGamepad, FaWindows } from "react-icons/fa";

const Game = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const fetchGames = async (query = "") => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=20`
        : `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page_size=20`;
      
      const res = await axios.get(endpoint);
      setGames(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  
  const getPlatformIcon = (slug) => {
    if (slug.includes('pc') || slug.includes('windows')) return <FaWindows />;
    if (slug.includes('playstation')) return <FaPlaystation />;
    if (slug.includes('xbox')) return <FaXbox />;
    if (slug.includes('nintendo') || slug.includes('switch') || slug.includes('android') || slug.includes('ios')) return <FaGamepad />;
    return <HiOutlineDesktopComputer />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white selection:bg-yellow-500/30 flex flex-col font-sans">
      
     
      <header className="sticky top-0 z-[100] bg-[#0f0f13]/90 backdrop-blur-2xl border-b border-white/5 p-5 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-500 border border-white/10 group"
          >
            <HiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic hidden sm:block">
            GAME<span className="text-yellow-500">VERSE</span>
          </h1>
        </div>

       
        <div className="relative w-full max-w-md ml-4">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-10" />
          <input
            type="text"
            placeholder="Search titles..."
            className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all text-sm"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                fetchGames(e.target.value);
            }}
          />
        </div>
      </header>

      
      <main className="flex-1 p-6 md:p-12">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[50vh] space-y-4">
            <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[4px] text-zinc-500 font-bold">Booting System...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {games.map((game, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={game.id}
                  onClick={() => navigate(`/game/details/${game.id}`)}
                  className="group relative bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] overflow-hidden border border-white/5 hover:border-yellow-500/40 transition-all duration-500 cursor-pointer shadow-2xl"
                >
                  
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={game.background_image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                      <HiStar className="text-yellow-500 text-xs" />
                      <span className="text-[11px] font-black">{game.rating || "N/A"}</span>
                    </div>
                  </div>

                  
                  <div className="p-6">
                    <div className="flex gap-3 mb-3">
                      {game.parent_platforms?.slice(0, 3).map(p => (
                        <span key={p.platform.id} className="text-zinc-500 text-sm group-hover:text-yellow-500 transition-colors duration-300">
                          {getPlatformIcon(p.platform.slug)}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black leading-tight mb-2 group-hover:text-yellow-500 transition-colors line-clamp-1">
                      {game.name}
                    </h3>
                    <div className="flex justify-between items-center mt-4">
                       <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold group-hover:text-zinc-400 transition-colors">
                         {game.released?.split('-')[0] || "TBA"}
                       </span>
                       <div className="h-[1px] flex-1 bg-white/5 mx-4 group-hover:bg-yellow-500/20 transition-colors"></div>
                       <span className="text-[10px] text-yellow-500 font-black uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                         Details
                       </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      
      <footer className="border-t border-white/5 p-10 bg-black/40 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black italic tracking-tighter">GAME<span className="text-yellow-500">VERSE</span></h2>
            <p className="text-[9px] text-zinc-600 uppercase tracking-[3px] mt-1">Next-Gen Gaming Database</p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
             <span className="hover:text-yellow-500 cursor-pointer transition-colors">GitHub</span>
             <span className="hover:text-yellow-500 cursor-pointer transition-colors">LinkedIn</span>
             <span className="hover:text-yellow-500 cursor-pointer transition-colors">RAWG API</span>
          </div>

          <p className="text-[9px] text-zinc-700">© 2026 CINEVERSE AI. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

    </div>
  );
};

export default Game;