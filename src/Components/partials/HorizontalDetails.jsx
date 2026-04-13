import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import instance from '../../Utils/axios';
import { FaArrowLeftLong, FaPlay, FaStar, FaYoutube } from "react-icons/fa6"; 

const HorizontalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'movie';

    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDetails = async () => {
        try {
            setLoading(true);
            
            const { data } = await instance.get(`/${type}/${id}?append_to_response=videos`);
            setInfo(data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching horizontal details", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
        window.scrollTo(0, 0);
    }, [id, type]);

    if (loading) return (
        <div className='w-full h-screen bg-[#1F1E24] flex items-center justify-center'>
            <div className='w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin'></div>
        </div>
    );

    
    const trailer = info.videos?.results.find(v => v.type === "Trailer") || info.videos?.results[0];

    return (
        <div className='min-h-screen bg-[#1F1E24] text-white pb-20'>
           
            <div className='relative w-full h-[60vh]'>
                <img 
                    className='w-full h-full object-cover opacity-40'
                    src={`https://image.tmdb.org/t/p/original${info.backdrop_path || info.poster_path}`} 
                    alt="" 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#1F1E24] to-transparent' />
                
                <button 
                    onClick={() => navigate(-1)}
                    className='absolute top-10 left-10 p-3 bg-red-600 rounded-full hover:scale-110 transition-all z-[50]'
                >
                    <FaArrowLeftLong />
                </button>
            </div>

           
            <div className='px-5 md:px-20 -mt-32 relative z-10 flex flex-col md:row gap-10'>
                <img 
                    className='w-64 hidden md:block rounded-2xl shadow-2xl border border-white/10'
                    src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} 
                    alt="" 
                />
                
                <div className='flex-1 py-10'>
                    <h1 className='text-4xl md:text-6xl font-black mb-2 tracking-tighter'>
                        {info.title || info.name}
                    </h1>
                    <p className='text-zinc-400 italic mb-5 text-lg'>{info.tagline}</p>
                    
                    <div className='flex items-center gap-5 mb-8'>
                        <span className='flex items-center gap-2 text-yellow-400 font-bold'>
                            <FaStar /> {info.vote_average.toFixed(1)}
                        </span>
                        <span className='px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase border border-white/10'>
                            {type}
                        </span>
                        <span className='text-zinc-500 font-bold'>{info.release_date?.split("-")[0] || info.first_air_date?.split("-")[0]}</span>
                    </div>

                    <h2 className='text-xl font-bold mb-3 underline decoration-red-600 decoration-4'>Overview</h2>
                    <p className='text-zinc-300 leading-relaxed max-w-3xl mb-10 text-base md:text-lg'>
                        {info.overview}
                    </p>

                    
                    {trailer ? (
                         <a 
                            href={`#trailer-section`}
                            className='w-fit px-8 py-4 bg-red-600 rounded-xl font-black flex items-center gap-3 hover:bg-white hover:text-red-600 transition-all shadow-lg shadow-red-600/20'
                        >
                            <FaPlay /> WATCH TRAILER
                        </a>
                    ) : (
                        <p className='text-zinc-500 font-bold italic'>Trailer not available for this {type}</p>
                    )}
                </div>
            </div>

            
            {trailer && (
                <div id="trailer-section" className='mt-20 px-5 md:px-20'>
                    <h2 className='text-2xl font-black mb-10 tracking-tighter flex items-center gap-3'>
                        <FaYoutube className='text-red-600 text-3xl'/> OFFICIAL TRAILER
                    </h2>
                    <div className='w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl'>
                        <iframe
                            className='w-full h-full'
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HorizontalDetails;