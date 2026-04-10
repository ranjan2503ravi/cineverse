import React, { useEffect, useState } from 'react';
import instance from '../../Utils/axios';
import { motion, AnimatePresence } from 'framer-motion';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom'; // 🔥 Import useNavigate

const HorizontalCards = () => {
  const navigate = useNavigate(); // 🔥 Initialize
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const getTrending = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/trending/${category}/day`);
      const filtered = res.data.results.filter(item => item.poster_path || item.backdrop_path);
      setData(filtered);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrending();
  }, [category]);

  return (
    <div className='w-full px-4 md:px-10 py-10 bg-[#1F1E24]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-xl md:text-3xl text-white font-black tracking-tighter flex items-center gap-2'>
          <span className="w-1.5 h-8 bg-red-600 rounded-full inline-block"></span>
          Trending
        </h1>
        
        <Dropdown 
          title="Filter" 
          options={["all", "movie", "tv"]} 
          func={(e) => setCategory(e.target.value)} 
        />
      </div>

      <div className='flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-8 mask-gradient'>
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className='min-w-[150px] md:min-w-[200px] h-[230px] md:h-[300px] bg-zinc-800/50 rounded-2xl animate-pulse' />
          ))
        ) : (
          data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              // 🔥 Dynamic Navigation: category pass kar rahe hain query param mein
              onClick={() => navigate(`/horizontal/details/${item.id}?type=${item.media_type || category}`)}
              className='min-w-[150px] md:min-w-[200px] h-[230px] md:h-[300px] bg-zinc-900 rounded-2xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] group cursor-pointer border border-white/5'
            >
              <img
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`}
                alt={item.title || item.name}
                loading="lazy"
              />
              
              <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80' />
              
              <div className='absolute bottom-0 left-0 w-full p-4 backdrop-blur-[2px]'>
                <h2 className='text-white text-xs md:text-sm font-bold line-clamp-1 mb-1'>
                  {item.title || item.name}
                </h2>
                <div className="flex items-center gap-2">
                   <span className='px-2 py-0.5 bg-red-600/20 text-red-500 text-[9px] font-black rounded uppercase border border-red-600/30'>
                    {item.media_type || category}
                  </span>
                  <span className='text-zinc-400 text-[10px] font-bold'>
                    ⭐ {item.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>  
  )
}

export default HorizontalCards;