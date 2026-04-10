import React, { useEffect, useState } from 'react';
import instance from '../Utils/axios';
import TopNav from './partials/TopNav';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';

const People = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getPeople = async () => {
        try {
            setLoading(true);
            const res = await instance.get(`/trending/person/day?page=${page}`);
            setData((prev) => [...prev, ...res.data.results]);
            setLoading(false);
        } catch (error) {
            console.log("People Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPeople();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                        <FaArrowLeftLong size={20} className="text-emerald-500" />
                    </motion.button>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-black tracking-tighter'>PEOPLE</h1>
                        <p className='text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase'>The Stars of Cinema</p>
                    </div>
                </div>
                <div className='hidden lg:block w-[400px]'><TopNav /></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 p-5 md:p-10'>
                <AnimatePresence>
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            onClick={() => navigate(`/person/${item.id}`)}
                            className='group flex flex-col items-center cursor-pointer'
                        >
                            <div className='relative w-full aspect-square rounded-full overflow-hidden border-4 border-white/5 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl'>
                                <img
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                    src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : "/images/16.jpg"}
                                    alt={item.name}
                                />
                            </div>
                            <div className='mt-4 text-center'>
                                <h2 className='text-sm md:text-base font-bold group-hover:text-emerald-400 transition-colors line-clamp-1'>{item.name}</h2>
                                <p className='text-[10px] text-zinc-500 font-bold uppercase mt-1'>{item.known_for_department}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {loading && <div className='flex justify-center p-10'><div className='w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin'></div></div>}
        </div>
    );
};

export default People;