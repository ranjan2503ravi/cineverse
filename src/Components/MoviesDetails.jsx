import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../Utils/axios'
import { FaArrowLeft, FaPlay, FaStar, FaRegClock, FaCalendarAlt } from "react-icons/fa"
import { motion } from 'framer-motion'

const MoviesDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const getDetails = async () => {
        try {
            setLoading(true)
            const { data } = await instance.get(`/movie/${id}?append_to_response=videos`)
            setInfo(data)
            setLoading(false)
        } catch (error) {
            console.log("Error fetching movie details", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDetails()
        window.scrollTo(0, 0)
    }, [id])

    if (loading) return (
        <div className='w-full h-screen bg-[#0F0F12] flex items-center justify-center'>
            <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
        </div>
    )

    return (
        <div className='min-h-screen bg-[#0F0F12] text-white overflow-x-hidden'>
            
            {/* Hero Section */}
            <div className='relative w-full h-[60vh] md:h-[80vh]'>
                <div className='absolute inset-0'>
                    <img 
                        className='w-full h-full object-cover opacity-50'
                        src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} 
                        alt={info.title} 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/40 to-transparent' />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-transparent to-transparent' />
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className='absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-blue-600 transition-all z-50'
                >
                    <FaArrowLeft size={20} />
                </button>

                <div className='absolute bottom-10 left-5 md:left-16 flex flex-col items-start z-10'>
                    <h1 className='text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-tight'>
                        {info.title}
                    </h1>

                    <div className='flex flex-wrap gap-5 text-sm font-bold mb-6 text-zinc-300'>
                        <span className='flex items-center gap-2'><FaStar className='text-blue-500'/> {info.vote_average.toFixed(1)}</span>
                        <span className='flex items-center gap-2'><FaCalendarAlt className='text-blue-400'/> {info.release_date?.split("-")[0]}</span>
                        <span className='flex items-center gap-2'><FaRegClock className='text-blue-400'/> {info.runtime} min</span>
                    </div>

                    <p className='text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-3xl line-clamp-3'>
                        {info.overview}
                    </p>

                    <button className='flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20'>
                        <FaPlay /> WATCH TRAILER
                    </button>
                </div>
            </div>

            {/* Trailer Player */}
            <div className='p-5 md:p-20 max-w-7xl mx-auto'>
                <h2 className='text-3xl font-black mb-10 tracking-tighter italic'>MOVIE PREVIEW</h2>
                <div className='relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900'>
                    {info.videos?.results?.length > 0 ? (
                        <iframe
                            className='w-full h-full'
                            src={`https://www.youtube.com/embed/${info.videos.results.find(v => v.type === "Trailer")?.key || info.videos.results[0].key}`}
                            title="Trailer"
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

export default MoviesDetails