import React, { useEffect, useState } from 'react';
import instance from '../../Utils/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [allData, setAllData] = useState([]);

  const getHeaderData = async () => {
    try {
      const { data } = await instance.get('/trending/all/day');
      setAllData(data.results);
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getHeaderData();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      const interval = setInterval(() => {
        const randomData = allData[Math.floor(Math.random() * allData.length)];
        setWallpaper(randomData);
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [allData]);

  
  const formatTitle = (title) => {
    if (!title) return "";
    return title.length > 35 ? title.slice(0, 35) + "..." : title;
  };

  return (
   <div className="w-full h-[85vh] relative overflow-hidden bg-[#1F1E24] mt-3.5">
      <AnimatePresence mode="wait">
        {wallpaper ? (
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%), 
                               linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%), 
                               url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.poster_path})`,
            }}
          >
            <div className="w-full h-full flex flex-col justify-end px-[5%] pb-20 z-10">
              
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-[800px]" 
              >
                
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-5 h-8 bg-red-600 rounded-sm flex items-center justify-center font-black text-white text-xs">C</div>
                   <span className="text-gray-300 tracking-[0.3em] text-[10px] font-bold uppercase">ineverse</span>
                </div>
                
                
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-[1.1] uppercase tracking-tighter">
                  {formatTitle(wallpaper.title || wallpaper.name || wallpaper.original_name || wallpaper.original_title)}
                </h1>

                
                <div className="flex items-center gap-4 mb-5 text-sm font-bold">
                   <span className="text-green-400">{(wallpaper.vote_average * 10).toFixed(0)}% Match</span>
                   <span className="text-gray-400">{(wallpaper.release_date || wallpaper.first_air_date || "").slice(0, 4)}</span>
                   <span className="border border-gray-500 px-2 py-[2px] text-[10px] text-gray-400 rounded">HD</span>
                </div>

              
                <p className="text-gray-200 text-sm md:text-lg w-full md:w-[70%] mb-8 line-clamp-3 font-medium drop-shadow-md leading-relaxed opacity-85">
                  {wallpaper.overview}
                </p>

                
                <div className="flex items-center gap-3">
                  <button className="bg-white text-black px-8 py-2.5 rounded hover:bg-opacity-80 transition-all flex items-center gap-2 font-bold text-lg active:scale-95">
                     <span className="text-2xl">▶</span> Play
                  </button>
                  
                  <button className="bg-gray-500/40 text-white px-8 py-2.5 rounded backdrop-blur-md border border-gray-400/30 hover:bg-gray-500/60 transition-all flex items-center gap-2 font-bold text-lg active:scale-95">
                     <span className="text-2xl">ⓘ</span> More Info
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
             
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;