import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import instance from "./Utils/axios";
import { IoArrowBackOutline, IoPlaySharp, IoCloseOutline } from "react-icons/io5";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduxItem = useSelector((state) => state.detail.item);

  const [data, setData] = useState(reduxItem);
  const [loading, setLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getDetails = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/movie/${id}`);
      setData(res.data);

      const { data: videoRes } = await instance.get(`/movie/${id}/videos`);
      const trailer = videoRes.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setVideoKey(trailer.key);
      
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  if (loading) return (
    <div className="h-screen w-full bg-[#0F0F0F] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-purple-600 border-zinc-800 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-purple-600">
      
    
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
      >
        <IoArrowBackOutline size={20} />
        <span className="font-bold">Back</span>
      </button>

      
      <div className="relative h-[65vh] md:h-[80vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, #0F0F0F 10%, transparent 60%), linear-gradient(to top, #0F0F0F, transparent), url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
          }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12">
          <h1 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl max-w-4xl leading-tight">
            {data?.title || data?.name}
          </h1>
          
          <div className="flex items-center gap-5 mb-8">
            <span className="bg-purple-600 px-3 py-1 rounded-md font-bold">⭐ {data?.vote_average?.toFixed(1)}</span>
            <span className="text-zinc-400 font-semibold">{data?.release_date?.split("-")[0]}</span>
            <span className="text-zinc-400 font-semibold">{data?.runtime} min</span>
          </div>

          <div className="flex gap-4">
            {videoKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-2xl"
              >
                <IoPlaySharp size={24} /> PLAY TRAILER
              </button>
            )}
            <button className="bg-zinc-800/80 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-zinc-700 transition-all">
              + MY LIST
            </button>
          </div>
        </div>
      </div>

     
      <div className="px-6 md:px-16 py-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 -mt-10 relative z-10">
        <div className="w-[200px] md:w-[320px] flex-shrink-0 mx-auto md:mx-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            className="rounded-2xl shadow-2xl border border-white/5"
            alt="poster"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-purple-500 font-black text-xs uppercase tracking-[0.3em] mb-4">The Synopsis</h3>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light italic mb-10">
            "{data?.overview}"
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-800 pt-8">
              
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase mb-1 tracking-widest">Status</p>
                <p className="text-white text-lg font-semibold">{data?.status || "N/A"}</p>
              </div>

              
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase mb-1 tracking-widest">Budget</p>
                <p className="text-white text-lg font-semibold">{data?.budget ? `$${(data.budget/1000000).toFixed(1)}M` : "N/A"}</p>
              </div>

              
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase mb-1 tracking-widest">Language</p>
                <p className="text-white text-lg font-semibold">{data?.original_language?.toUpperCase() || "N/A"}</p>
              </div>
          </div>
        </div>
      </div>

      
      {showTrailer && videoKey && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-8 right-8 text-white hover:text-purple-500 transition-all p-2"
          >
            <IoCloseOutline size={45} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;