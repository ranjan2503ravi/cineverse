import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../Utils/axios'
import { FaArrowLeftLong, FaInstagram, FaImdb, FaXTwitter } from "react-icons/fa6"
import { motion } from 'framer-motion'

const PersonDetails = () => {
    // 🔥 Direct id uthao (split karne ki zaroorat nahi agar navigate sahi hai)
    const { id } = useParams()
    const navigate = useNavigate()
    const [showFullBio, setShowFullBio] = useState(false)

    const [data, setData] = useState({
        person: null,
        credits: [],
        external: null,
        loading: true
    })

    const getPersonData = async () => {
        try {
            const [details, credits, external] = await Promise.all([
                instance.get(`/person/${id}`),
                instance.get(`/person/${id}/combined_credits`),
                instance.get(`/person/${id}/external_ids`)
            ])

            setData({
                person: details.data,
                credits: credits.data.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 20),
                external: external.data,
                loading: false
            })
        } catch (err) {
            console.log("Error fetching person details:", err)
            setData(prev => ({ ...prev, loading: false }))
        }
    }

    useEffect(() => {
        getPersonData()
        window.scrollTo(0, 0)
    }, [id])

    if (data.loading) return <Loader />
    if (!data.person) return <div className="h-screen flex items-center justify-center text-white">Person not found!</div>

    const { person, credits, external } = data

    return (
        <div className="bg-[#0F0F12] text-white min-h-screen">
            
            {/* 🌌 Background Backdrop */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <img 
                    src={person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : ""} 
                    className="w-full h-full object-cover blur-[100px]" 
                    alt="" 
                />
            </div>

            {/* 🔙 Navigation */}
            <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-[100] backdrop-blur-md bg-black/20 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase tracking-[3px] hover:text-emerald-400 transition-colors">
                    <FaArrowLeftLong /> Back
                </button>
                <div className="flex gap-6">
                    {external?.instagram_id && <a href={`https://instagram.com/${external.instagram_id}`} target="_blank" rel="noreferrer"><FaInstagram className="text-xl hover:text-pink-500" /></a>}
                    {external?.twitter_id && <a href={`https://twitter.com/${external.twitter_id}`} target="_blank" rel="noreferrer"><FaXTwitter className="text-xl hover:text-blue-400" /></a>}
                    {external?.imdb_id && <a href={`https://imdb.com/name/${external.imdb_id}`} target="_blank" rel="noreferrer"><FaImdb className="text-xl hover:text-yellow-400" /></a>}
                </div>
            </nav>

            <div className="relative z-10 container mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* 👤 Left Side */}
                    <div className="lg:w-1/3">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img 
                                    src={person.profile_path ? `https://image.tmdb.org/t/p/h632${person.profile_path}` : "/images/noimage.jpg"} 
                                    className="w-full object-cover" 
                                    alt={person.name} 
                                />
                            </div>
                            
                            <div className="mt-8 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-emerald-400 font-black text-xs uppercase tracking-widest">Personal Info</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase">Known For</p>
                                        <p className="text-sm font-medium">{person.known_for_department}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase">Birthday</p>
                                        <p className="text-sm font-medium">{person.birthday || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 📝 Right Side */}
                    <div className="lg:w-2/3">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter leading-none">{person.name}</h1>
                            
                            <div className="mb-12">
                                <h3 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4">Biography</h3>
                                <p className="text-zinc-300 text-lg leading-relaxed">
                                    {person.biography 
                                        ? (showFullBio ? person.biography : `${person.biography.slice(0, 600)}...`)
                                        : "No biography available."
                                    }
                                    {person.biography?.length > 600 && (
                                        <button onClick={() => setShowFullBio(!showFullBio)} className="ml-2 text-emerald-400 font-bold">
                                            {showFullBio ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* 🎬 Work Section */}
                            <h3 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-6">Top Works</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {credits.map((item, idx) => (
                                    <div key={idx} onClick={() => navigate(`/${item.media_type}/details/${item.id}`)} className="cursor-pointer group">
                                        <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/5">
                                            <img 
                                                src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/images/noimage.jpg"} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                alt="" 
                                            />
                                        </div>
                                        <p className="text-[11px] font-black line-clamp-1 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                                            {item.title || item.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Loader = () => (
    <div className="h-screen flex items-center justify-center bg-[#0F0F12]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
)

export default PersonDetails