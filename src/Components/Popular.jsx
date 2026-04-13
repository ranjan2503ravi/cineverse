import React, { useEffect, useState } from 'react'
import instance from '../Utils/axios'
import TopNav from './partials/TopNav'
import { useNavigate, Link } from 'react-router-dom' 
import { FaArrowLeftLong } from "react-icons/fa6"
import { motion, AnimatePresence } from 'framer-motion'
import Dropdown from './partials/Dropdown'

const Popular = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("movie")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const getPopular = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/${category}/popular?page=${page}`)
            setData((prev) => (page === 1 ? res.data.results : [...prev, ...res.data.results]))
            setLoading(false)
        } catch (error) {
            console.log("Popular Error:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getPopular()
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
                        className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10"
                    >
                        <FaArrowLeftLong size={20} className="text-yellow-500" />
                    </motion.button>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-black tracking-tighter'>POPULAR</h1>
                        <p className='text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase'>Most watched globally</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='hidden lg:block w-[400px]'>
                        <TopNav />
                    </div>
                    <Dropdown 
                        title="Category" 
                        options={["movie", "tv"]} 
                        func={(e) => {
                            setCategory(e.target.value)
                            setPage(1)
                        }} 
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:p-10'>
                <AnimatePresence>
                    {data.map((item, index) => (
                        <Link to={`/popular/details/${item.id}`} key={index}> 
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.02 }}
                                className='group relative bg-[#1A1A1E] rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer aspect-video'
                            >
                                <img
                                    className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100'
                                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                                    alt={item.title || item.name}
                                    loading="lazy"
                                />

                                <div className='absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent' />
                                
                                <div className='absolute bottom-0 left-0 w-full p-6'>
                                    <div className='flex items-center gap-3 mb-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300'>
                                        <span className='px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded-full border border-yellow-500/20'>
                                            POPULAR
                                        </span>
                                        <span className='text-white text-xs font-bold flex items-center gap-1'>
                                            ⭐ {item.vote_average?.toFixed(1)}
                                        </span>
                                    </div>
                                    <h2 className='text-xl font-black group-hover:text-yellow-500 transition-colors uppercase italic tracking-tighter'>
                                        {item.title || item.name}
                                    </h2>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </AnimatePresence>
            </div>

            {loading && (
                <div className='flex justify-center p-10'>
                    <div className='w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>
                </div>
            )}
        </div>
    )
}

export default Popular