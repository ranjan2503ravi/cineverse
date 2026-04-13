import React, { useEffect, useState } from 'react'
import instance from '../Utils/axios'
import TopNav from './partials/TopNav'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { motion, AnimatePresence } from 'framer-motion'

const Trending = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getTrending = async () => {
    try {
      setLoading(true)
      const res = await instance.get(`/trending/all/day?page=${page}`)
      setData((prev) => [...prev, ...res.data.results])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getTrending()
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className='bg-[#0F0F12] min-h-screen text-white pb-10'>
      
      
      <div className='sticky top-0 z-[100] backdrop-blur-xl bg-[#0F0F12]/80 border-b border-white/5 px-5 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <motion.button 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <FaArrowLeftLong size={20} className="text-red-500" />
          </motion.button>
          <div>
            <h1 className='text-2xl md:text-3xl font-black tracking-tighter'>TRENDING</h1>
            <p className='text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase'>The best of today</p>
          </div>
        </div>
        <div className='hidden md:block w-1/2'>
          <TopNav />
        </div>
      </div>

      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-5 md:p-10'>
        <AnimatePresence>
          {data.map((item, index) => (
            <Link to={`/trending/details/${item.id}`} key={index} className="block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                whileHover={{ y: -10 }}
                className='group relative bg-[#1A1A1E] rounded-2xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer aspect-[2/3]'
              >
                <img
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                  alt={item.title || item.name}
                  loading="lazy"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-100' />
                <div className='absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded uppercase'>
                      {item.media_type || "HIT"}
                    </span>
                    <span className='text-yellow-400 text-[10px] font-bold'>⭐ {item.vote_average?.toFixed(1)}</span>
                  </div>
                  <h2 className='text-sm md:text-base font-bold line-clamp-1 group-hover:text-red-500 transition-colors'>
                    {item.title || item.name || "No Title"}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className='grid grid-cols-2 md:grid-cols-5 gap-6 px-10'>
           {[...Array(5)].map((_, i) => (
             <div key={i} className='aspect-[2/3] bg-zinc-800/50 animate-pulse rounded-2xl' />
           ))}
        </div>
      )}
    </div>
  )
}

export default Trending