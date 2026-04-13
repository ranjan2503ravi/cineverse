import React, { useState, useEffect } from "react";
import instance from "../../Utils/axios";
import { CiSearch, CiMicrophoneOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch } from "react-redux";
import { setDetail } from "../../features/detailSlice";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleVoice = () => {
    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

 
  const getSearch = async () => {
    try {
      setLoading(true);
      const res = await instance.get(`/search/multi?query=${input}`);
      setData(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim() !== "") getSearch();
      else setData([]);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);


  const handleClick = (item) => {
    dispatch(setDetail(item));           
    navigate(`/details/${item.id}`);    
    setInput("");                    
  };

  return (
    <div className="w-full flex justify-center pt-2.5 px-3 md:px-5">
      <div className="relative flex items-center gap-2 md:gap-4 w-full max-w-[800px] ml-12 md:ml-0">

       
        <div className="relative flex-1 min-w-0">
          <div className="flex items-center bg-[#1f1f1f] rounded-full px-3 md:px-4 py-2 md:py-3 shadow-lg border border-gray-700 focus-within:border-red-500 transition-all duration-300">

            <CiSearch className="text-xl text-gray-400" />

            <input
              type="text"
              placeholder="Search movies, TV shows..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none text-white px-2 w-full text-[11px] md:text-base placeholder:text-gray-500"
            />

            <div className="flex items-center gap-1 md:gap-2">
              {input && (
                <IoMdClose
                  onClick={() => setInput("")}
                  className="text-lg md:text-xl text-gray-400 cursor-pointer hover:text-white"
                />
              )}

              <CiMicrophoneOn
                onClick={handleVoice}
                className="text-lg md:text-xl text-gray-400 cursor-pointer hover:text-white border-l border-gray-600 pl-1 md:pl-2"
              />
            </div>
          </div>

          
          {input && (
            <div className="absolute top-12 md:top-14 left-0 w-full max-h-[350px] bg-[#1f1f1f] border border-gray-700 rounded-2xl shadow-2xl overflow-y-auto z-[999] mt-1">

              
              {loading ? (
                <div className="p-4 flex flex-col gap-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-10 bg-gray-800 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : (
                data.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(item)}  
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 cursor-pointer border-b border-gray-800/50 last:border-0"
                  >
                    <img
                      className="h-10 w-8 md:h-12 md:w-9 rounded-md object-cover"
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                          : "/images/b.jpg"
                      }
                      alt=""
                    />

                    <div className="overflow-hidden">
                      <p className="text-white text-xs md:text-sm font-medium truncate">
                        {item.title || item.name}
                      </p>
                      <p className="text-red-500 text-[9px] md:text-[10px] font-bold uppercase">
                        {item.media_type}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        
        <button
          onClick={() => setOpenAuth(true)}
          className="bg-[#E50914] hover:bg-[#b20710] text-white font-bold transition-all shadow-lg active:scale-90
                     p-2.5 rounded-full md:px-8 md:py-3 flex items-center justify-center"
        >
          <span className="hidden md:block text-sm">Login</span>
          <FaRegUserCircle className="block md:hidden text-xl" />
        </button>

       
        <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
      </div>
    </div>
  );
};

export default TopNav;