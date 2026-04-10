import React, { useEffect, useState } from 'react'
import instance from '../Utils/axios'
import TopNav from './partials/TopNav'
import { useNavigate, Link } from 'react-router-dom' // Link yahan add kiya
import { FaArrowLeftLong } from "react-icons/fa6"
import { motion, AnimatePresence } from 'framer-motion'
import Dropdown from './partials/Dropdown'

const Movies = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("now_playing")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const getMovies = async () => {
        try {
            setLoading(true)
            const res = await instance.get(`/movie/${category}?page=${page}`)
            setData((prev) => (page === 1 ? res.data.results : [...prev, ...res.data.results]))
            setLoading(false)
        } catch (error) {
            console.log("Movies Error:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies()
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
                        <FaArrowLeftLong size={20} className="text-blue-500" />
                    </motion.button>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-black tracking-tighter'>MOVIES</h1>
                        <p className='text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase'>Explore Cinema World</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='hidden lg:block w-[400px]'>
                        <TopNav />
                    </div>
                    <Dropdown 
                        title="Filter" 
                        options={["now_playing", "popular", "top_rated", "upcoming"]} 
                        func={(e) => {
                            setCategory(e.target.value)
                            setPage(1)
                        }} 
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-5 md:p-10'>
                <AnimatePresence>
                    {data.map((item, index) => (
                        <Link to={`/movies/details/${item.id}`} key={index}> {/* Correct Path */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                                whileHover={{ y: -8 }}
                                className='group relative bg-[#1A1A1E] rounded-2xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer aspect-[2/3]'
                            >
                                <img
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity' />
                                <div className='absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10'>
                                    <span className='text-blue-400 text-[10px] font-black'>
                                        ⭐ {item.vote_average?.toFixed(1)}
                                    </span>
                                </div>
                                <div className='absolute bottom-0 left-0 w-full p-4'>
                                    <h2 className='text-sm font-bold line-clamp-1 group-hover:text-blue-500 transition-colors'>
                                        {item.title}
                                    </h2>
                                    <p className='text-[10px] text-zinc-500 font-medium mt-1 uppercase tracking-wider'>
                                        {item.release_date?.split("-")[0] || "Soon"}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </AnimatePresence>
            </div>
            {loading && <div className='flex justify-center p-10'><div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div></div>}
        </div>
    )
}

export default Movies