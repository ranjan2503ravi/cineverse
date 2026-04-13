import React, { useEffect, useState } from 'react'
import instance from '../Utils/axios'
import TopNav from './partials/TopNav'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { motion, AnimatePresence } from 'framer-motion'
import Dropdown from './partials/Dropdown'

const Tv = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("airing_today")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

   
    const getTvShows = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/tv/${category}?page=${page}`)
            setData((prev) => (page === 1 ? res.data.results : [...prev, ...res.data.results]))
            setLoading(false)
        } catch (error) {
            console.log("TV Error:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getTvShows()
    }, [category, page])

    
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
                        <FaArrowLeftLong size={20} className="text-[#8b7ff0]" />
                    </motion.button>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-black tracking-tighter uppercase'>TV SHOWS</h1>
                        <p className='text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase'>Binge-worthy series</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='hidden lg:block w-[400px]'>
                        <TopNav />
                    </div>
                    <Dropdown 
                        title="Filter" 
                        options={["airing_today", "on_the_air", "popular", "top_rated"]} 
                        func={(e) => {
                            setCategory(e.target.value)
                            setPage(1)
                            setData([]) 
                        }} 
                    />
                </div>
            </div>

            
            <div className='lg:hidden px-5 mt-4'>
                <TopNav />
            </div>

            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-5 md:p-10'>
                <AnimatePresence mode='popLayout'>
                    {data.map((item, index) => (
                        <Link 
                            to={`/tv/details/${item.id}`} 
                            key={index}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -10 }}
                                className='group relative bg-[#1A1A1E] rounded-2xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer aspect-[2/3]'
                            >
                                
                                <img
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/noimage.jpg"}
                                    alt={item.name}
                                    loading="lazy"
                                />

                                <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent opacity-90' />
                                
                                
                                <div className='absolute top-3 left-3 bg-[#8b7ff0]/20 backdrop-blur-md px-2 py-0.5 rounded border border-[#8b7ff0]/30'>
                                    <span className='text-[#8b7ff0] text-[10px] font-black uppercase'>Series</span>
                                </div>

                                
                                <div className='absolute bottom-0 left-0 w-full p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform'>
                                    <h2 className='text-sm md:text-base font-bold line-clamp-1 group-hover:text-[#8b7ff0] transition-colors'>
                                        {item.name || "Unknown Show"}
                                    </h2>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className='text-[10px] text-zinc-500 font-bold uppercase'>
                                            {item.first_air_date?.split("-")[0] || "Coming Soon"}
                                        </span>
                                        <span className='text-yellow-400 text-[10px] font-bold'>
                                            ⭐ {item.vote_average?.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </AnimatePresence>
            </div>

           
            {loading && (
                <div className='flex justify-center p-10'>
                    <div className='w-8 h-8 border-2 border-[#8b7ff0] border-t-transparent rounded-full animate-spin'></div>
                </div>
            )}

        </div>
    )
}

export default Tv