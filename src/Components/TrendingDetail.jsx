import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../Utils/axios'
import { FaArrowLeft, FaPlay, FaStar, FaRegClock, FaCalendarAlt } from "react-icons/fa"
import { motion } from 'framer-motion'

const TrendingDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const getDetails = async () => {
    try {
      setLoading(true)
      let res;
      // Trending mein Movie ya TV kuch bhi ho sakta hai, isliye dono try karte hain
      try {
        res = await instance.get(`/movie/${id}?append_to_response=videos`)
      } catch (err) {
        res = await instance.get(`/tv/${id}?append_to_response=videos`)
      }
      setInfo(res.data)
      setLoading(false)
    } catch (error) {
      console.log("Error fetching details", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetails()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return (
    <div className='w-full h-screen bg-[#0F0F12] flex items-center justify-center'>
      <div className='w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='min-h-screen bg-[#0F0F12] text-white overflow-x-hidden'>
      
      {/* 🎬 Hero Section */}
      <div className='relative w-full h-[60vh] md:h-[85vh]'>
        <div className='absolute inset-0'>
          <img 
            className='w-full h-full object-cover'
            src={`https://image.tmdb.org/t/p/original${info.backdrop_path || info.poster_path}`} 
            alt="" 
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/60 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-transparent to-transparent' />
        </div>

        <button 
          onClick={() => navigate(-1)}
          className='absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-red-600 transition-all z-50'
        >
          <FaArrowLeft size={20} />
        </button>

        <div className='absolute bottom-10 left-5 md:left-16 flex flex-col md:flex-row items-end gap-10 z-10'>
          <motion.img 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className='hidden md:block w-64 rounded-2xl shadow-2xl border border-white/10'
            src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} 
          />
          
          <div className='flex-1 max-w-4xl'>
            <h1 className='text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-tight'>
              {info.title || info.name}
            </h1>

            <div className='flex flex-wrap gap-5 text-sm font-bold mb-6 text-zinc-300'>
               <span className='flex items-center gap-2'><FaStar className='text-yellow-400'/> {info.vote_average?.toFixed(1)}</span>
               <span>{info.release_date?.split("-")[0] || info.first_air_date?.split("-")[0]}</span>
               <span>{info.runtime || info.episode_run_time?.[0] || "N/A"} min</span>
            </div>

            <p className='text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl'>
              {info.overview}
            </p>

            <div className='flex gap-4'>
              <button className='flex items-center gap-3 px-10 py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all transform active:scale-95 shadow-lg shadow-red-600/20'>
                <FaPlay /> WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📺 Trailer Section */}
      <div className='p-5 md:p-20'>
        <h2 className='text-3xl font-black mb-10 tracking-tighter'>PREVIEW</h2>
        <div className='relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900'>
          {info.videos?.results?.length > 0 ? (
            <iframe
              className='w-full h-full'
              src={`https://www.youtube.com/embed/${info.videos.results.find(v => v.type === "Trailer")?.key || info.videos.results[0].key}?rel=0&autoplay=0`}
              title="Video"
              allowFullScreen
            ></iframe>
          ) : (
            <div className='w-full h-full flex items-center justify-center text-zinc-600 font-bold'>NO TRAILER FOUND</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrendingDetail