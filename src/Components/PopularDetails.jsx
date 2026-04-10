import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../Utils/axios'
import { FaArrowLeft, FaPlay, FaStar, FaRegClock, FaCalendarAlt } from "react-icons/fa"
import { motion } from 'framer-motion'

const PopularDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const getDetails = async () => {
        try {
            setLoading(true)
            let res;
            // Popular category movie bhi ho sakti hai aur tv bhi
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
            <div className='w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
    )

    return (
        <div className='min-h-screen bg-[#0F0F12] text-white overflow-x-hidden'>
            
            {/* 🎬 Hero Banner */}
            <div className='relative w-full h-[60vh] md:h-[80vh]'>
                <div className='absolute inset-0'>
                    <img 
                        className='w-full h-full object-cover opacity-60'
                        src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} 
                        alt="" 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/50 to-transparent' />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-transparent to-transparent' />
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className='absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-yellow-500 transition-all z-50'
                >
                    <FaArrowLeft size={20} />
                </button>

                <div className='absolute bottom-10 left-5 md:left-16 flex flex-col items-start max-w-4xl z-10'>
                    <h1 className='text-5xl md:text-8xl font-black mb-4 tracking-tighter italic uppercase leading-tight'>
                        {info.title || info.name}
                    </h1>

                    <div className='flex flex-wrap gap-5 text-sm font-bold mb-6 text-zinc-300'>
                        <span className='flex items-center gap-2'><FaStar className='text-yellow-500'/> {info.vote_average.toFixed(1)}</span>
                        <span>{info.release_date?.split("-")[0] || info.first_air_date?.split("-")[0]}</span>
                        <span className='px-2 py-0.5 bg-white/10 rounded uppercase text-[10px] tracking-widest'>{info.status}</span>
                    </div>

                    <p className='text-zinc-400 text-base md:text-lg leading-relaxed mb-8 line-clamp-3'>
                        {info.overview}
                    </p>

                    <button className='flex items-center gap-3 px-10 py-4 bg-yellow-500 text-black font-black rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)]'>
                        <FaPlay /> WATCH TRAILER
                    </button>
                </div>
            </div>

            {/* 📺 Premium Player Section */}
            <div className='p-5 md:p-20 max-w-7xl mx-auto'>
                <h2 className='text-3xl font-black mb-10 tracking-tighter italic'>OFFICIAL PREVIEW</h2>
                <div className='relative w-full aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900'>
                    {info.videos?.results?.length > 0 ? (
                        <iframe
                            className='w-full h-full'
                            src={`https://www.youtube.com/embed/${info.videos.results.find(v => v.type === "Trailer")?.key || info.videos.results[0].key}?rel=0&modestbranding=1`}
                            title="Trailer"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center text-zinc-700'>
                            <FaPlay size={60} className='mb-4 opacity-10' />
                            <p className='font-black uppercase tracking-[10px]'>No Preview Available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopularDetails