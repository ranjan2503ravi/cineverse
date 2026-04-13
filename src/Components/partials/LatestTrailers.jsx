import React, { useEffect, useState, useRef } from 'react';
import instance from '../../Utils/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaVolumeMute, FaVolumeUp, FaChevronRight } from "react-icons/fa";

const LatestTrailers = () => {
    const [category, setCategory] = useState("popular");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);
    const [videoKeys, setVideoKeys] = useState({});
    const [isMuted, setIsMuted] = useState(true);
    const scrollRef = useRef(null);

    const filters = [
        { id: "popular", label: "Popular", api: "/movie/popular" },
        { id: "streaming", label: "Streaming", api: "/tv/airing_today" },
        { id: "on_tv", label: "On TV", api: "/tv/on_the_air" },
        { id: "theater", label: "In Theaters", api: "/movie/now_playing" },
    ];

    const getTrailers = async () => {
        try {
            setLoading(true);
            const activeFilter = filters.find(f => f.id === category);
            const res = await instance.get(activeFilter.api);
            setData(res.data.results.slice(0, 15)); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trailers:", error);
            setLoading(false);
        }
    };

    const fetchVideoKey = async (id) => {
        if (videoKeys[id]) return;
        try {
            const isTV = category === "streaming" || category === "on_tv";
            const { data } = await instance.get(`/${isTV ? "tv" : "movie"}/${id}/videos`);
            const video = data.results.find(v => v.type === "Trailer" || v.type === "Teaser") || data.results[0];
            if (video) {
                setVideoKeys(prev => ({ ...prev, [id]: video.key }));
            }
        } catch (err) {
            console.log("Video not found for ID:", id);
        }
    };

    useEffect(() => {
        getTrailers();
    }, [category]);

    return (
        <div className="relative w-full py-16 bg-[#1F1E24] select-none overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 px-6 md:px-16">

                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">

                    <div className="space-y-1">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            On Demand
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold text-white">
                            Latest <span className="text-red-500">Trailers</span>
                        </h1>
                    </div>

                   
                    <div className="flex p-1 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/5 shadow-inner">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setCategory(f.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-500 uppercase tracking-wider ${category === f.id
                                        ? "bg-red-600 text-white shadow-[0_4px_15px_rgba(220,38,38,0.4)]"
                                        : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-10 pt-4 scrollbar-hide snap-x snap-mandatory"
                >
                    {loading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="min-w-[320px] md:min-w-[440px] aspect-video bg-zinc-800/40 rounded-3xl animate-pulse border border-white/5" />
                        ))
                    ) : (
                        data.map((item) => (
                            <motion.div
                                key={item.id}
                                onMouseEnter={() => {
                                    setHoveredId(item.id);
                                    fetchVideoKey(item.id);
                                }}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="min-w-[320px] md:min-w-[440px] aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group snap-center"
                            >
                                
                                <img
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${hoveredId === item.id ? 'opacity-0 scale-110' : 'opacity-60'
                                        }`}
                                    src={`https://image.tmdb.org/t/p/w780${item.backdrop_path || item.poster_path}`}
                                    alt={item.title}
                                    loading="lazy"
                                />

                                
                                <AnimatePresence>
                                    {hoveredId === item.id && videoKeys[item.id] && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 w-full h-full bg-black"
                                        >
                                            <iframe
                                                className="w-full h-full pointer-events-none scale-[1.4] origin-center"
                                                src={`https://www.youtube.com/embed/${videoKeys[item.id]}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${videoKeys[item.id]}&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                                                allow="autoplay; encrypted-media"
                                                title={item.title}
                                            />

                                           
                                            <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-20">
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-0.5 bg-red-600 text-[10px] font-black rounded text-white">4K HDR</span>
                                                    <span className="px-2 py-0.5 bg-black/50 backdrop-blur-md text-[10px] font-black rounded text-white border border-white/10 uppercase">
                                                        {item.original_language}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                                    className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10 flex items-center justify-center hover:bg-red-600 transition-all active:scale-90"
                                                >
                                                    {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                                                </button>
                                            </div>

                                            
                                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 30, ease: "linear" }}
                                                    className="h-full bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                
                                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-all duration-500 ${hoveredId === item.id ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="w-20 h-20 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-700">
                                        <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                                            <FaPlay size={20} className="ml-1" />
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-10">
                                    <motion.h3
                                        className="text-white font-black text-xl md:text-2xl drop-shadow-2xl line-clamp-1"
                                        layout
                                    >
                                        {item.title || item.name}
                                    </motion.h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <p className="text-red-500 text-xs font-bold uppercase tracking-tighter">Official Trailer</p>
                                        <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                        <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                            {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                
                <div className="flex items-center gap-4 text-zinc-600 mt-4">
                    <div className="h-[1px] flex-grow bg-zinc-900"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore more</p>
                    <div className="h-[1px] flex-grow bg-zinc-900"></div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default LatestTrailers;