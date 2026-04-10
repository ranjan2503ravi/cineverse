import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { HiArrowLeft, HiStar, HiCalendar, HiGlobeAlt } from "react-icons/hi";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGameData = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        setGame(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  if (loading) return (
    <div className="h-screen bg-[#1F1E24] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
   
    <div className="min-h-screen bg-[#1F1E24] text-white font-sans pt-16 md:pt-0">
      
      <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
     
        <img 
          src={game.background_image_additional || game.background_image} 
          className="w-full h-full object-cover object-top"
          alt={game.name}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E24] via-[#1F1E24]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1E24] via-transparent to-transparent"></div>

        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-[60] p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-yellow-500 hover:text-black transition-all shadow-2xl"
        >
          <HiArrowLeft size={22} />
        </button>

        
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-16 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase">RAWG Elite</span>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                <HiStar /> {game.rating}
              </div>
              <div className="text-zinc-300 text-sm font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-2">
                <HiCalendar className="text-yellow-500"/> {game.released?.split('-')[0]}
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9] mb-6 drop-shadow-2xl">
              {game.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {game.genres?.map(g => (
                <span key={g.id} className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {g.name}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={game.website} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-3 rounded-xl font-black hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 text-sm">
                <HiGlobeAlt size={18}/> OFFICIAL SITE
              </a>
              <button className="bg-zinc-800/60 backdrop-blur-md border border-white/5 text-white px-8 py-3 rounded-xl font-black hover:bg-zinc-700 transition-all text-sm uppercase">
                Add to Collection
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-block border-b-2 border-yellow-500 pb-1">
            <h2 className="text-xl font-black uppercase tracking-[4px] italic">The Story</h2>
          </div>
          <p className="text-zinc-400 text-lg leading-relaxed text-justify font-medium opacity-80">
            {game.description_raw || "This title holds its secrets well. No official overview has been transmitted yet."}
          </p>
        </div>

        
        <div className="space-y-10">
            <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/5 shadow-inner">
              <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[4px] mb-6">Technical Intel</h3>
              
              <div className="space-y-6">
                <section>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms?.map(p => (
                      <span key={p.platform.id} className="text-[11px] font-bold bg-white/5 px-3 py-1 rounded-md text-zinc-300 border border-white/5">
                        {p.platform.name}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Studios</p>
                  <p className="text-sm font-bold italic text-zinc-200">
                    {game.developers?.map(d => d.name).join(" • ") || "Indie / Unknown"}
                  </p>
                </section>

                <section>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Average Playtime</p>
                  <p className="text-3xl font-black text-white">
                    {game.playtime || "???"} <span className="text-xs text-yellow-500 uppercase italic">HRS</span>
                  </p>
                </section>
              </div>
            </div>
        </div>
      </div>

      
      <div className="h-32 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-50"></div>

    </div>
  );
};

export default GameDetails;