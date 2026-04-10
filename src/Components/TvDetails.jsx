import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../Utils/axios'
import { FaArrowLeftLong, FaPlay, FaStar, FaTv, FaLayerGroup, FaLanguage } from "react-icons/fa6"
import { motion } from 'framer-motion'

const TvDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const getDetails = async () => {
        try {
            setLoading(true)
            const { data } = await instance.get(`/tv/${id}?append_to_response=videos,similar`)
            setInfo(data)
            setLoading(false)
        } catch (error) {
            console.log("TV Details Error", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDetails()
        window.scrollTo(0, 0)
    }, [id])

    if (loading) return (
        <div className='w-full h-screen bg-[#0F0F12] flex items-center justify-center'>
            <div className='w-16 h-16 border-4 border-[#8b7ff0] border-t-transparent rounded-full animate-spin'></div>
        </div>
    )

    return (
        <div className='min-h-screen bg-[#0F0F12] text-white overflow-x-hidden'>
            
            {/* 🎬 Dynamic Header Section */}
            <div className='relative w-full h-[70vh] md:h-[90vh]'>
                <div className='absolute inset-0'>
                    <img 
                        className='w-full h-full object-cover opacity-30 scale-105 blur-[2px]'
                        src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} 
                        alt="" 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/80 to-transparent' />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-transparent to-transparent' />
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className='absolute top-8 left-8 p-3 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 hover:bg-[#8b7ff0] hover:text-black transition-all z-50'
                >
                    <FaArrowLeftLong size={20} />
                </button>

                <div className='absolute bottom-12 left-6 md:left-20 flex flex-col items-start z-10 max-w-5xl'>
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
                        <div className='flex items-center gap-3 mb-4'>
                            <span className='px-3 py-1 bg-[#8b7ff0]/20 text-[#8b7ff0] text-[10px] font-black rounded-md border border-[#8b7ff0]/30 tracking-widest uppercase'>TV SERIES</span>
                            <span className='flex items-center gap-1 text-yellow-400 font-bold text-sm'><FaStar/> {info.vote_average.toFixed(1)}</span>
                        </div>
                        
                        <h1 className='text-5xl md:text-9xl font-black mb-6 tracking-tighter leading-none uppercase'>
                            {info.name}
                        </h1>

                        <div className='flex flex-wrap gap-6 text-xs font-bold mb-8 text-zinc-400 uppercase tracking-widest'>
                            <span className='flex items-center gap-2'><FaLayerGroup className='text-[#8b7ff0]'/> {info.number_of_seasons} Seasons</span>
                            <span className='flex items-center gap-2'><FaTv className='text-[#8b7ff0]'/> {info.number_of_episodes} Episodes</span>
                            <span className='flex items-center gap-2'><FaLanguage className='text-[#8b7ff0]'/> {info.original_language}</span>
                        </div>

                        <p className='text-zinc-400 text-base md:text-xl leading-relaxed mb-10 max-w-3xl line-clamp-3 md:line-clamp-none'>
                            {info.overview}
                        </p>

                        <div className='flex gap-4'>
                            <button className='flex items-center gap-3 px-10 py-4 bg-[#8b7ff0] text-black font-black rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#8b7ff0]/20'>
                                <FaPlay /> START WATCHING
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 📺 Seasons Section */}
            <div className='p-6 md:p-20 container mx-auto'>
                <h2 className='text-2xl font-black mb-10 tracking-tighter border-l-4 border-[#8b7ff0] pl-4 uppercase'>Seasons</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {info.seasons.map((season, index) => (
                        <div key={index} className='group cursor-pointer'>
                            <div className='relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 mb-3'>
                                <img 
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    src={season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : "/images/noimage.jpg"} 
                                    alt={season.name} 
                                />
                                <div className='absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent'>
                                    <p className='text-[10px] font-black text-[#8b7ff0]'>{season.episode_count} EPISODES</p>
                                </div>
                            </div>
                            <h3 className='font-bold text-sm group-hover:text-[#8b7ff0] transition-colors'>{season.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🎥 Trailer Section */}
            <div className='p-6 md:p-20 bg-zinc-950/50'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='text-2xl font-black mb-10 tracking-tighter uppercase'>Official Preview</h2>
                    <div className='relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,127,240,0.1)]'>
                        {info.videos?.results?.length > 0 ? (
                            <iframe
                                className='w-full h-full'
                                src={`https://www.youtube.com/embed/${info.videos.results.find(v => v.type === "Trailer")?.key || info.videos.results[0].key}`}
                                title="Trailer"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className='w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-black italic'>PREVIEW NOT AVAILABLE</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TvDetails