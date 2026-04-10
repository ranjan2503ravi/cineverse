import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFirefox } from "react-icons/fa";
import { GiMagicSwirl, GiTv, GiGamepad } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const feedLinks = [
    { to: "/trending", icon: <FaFirefox />, label: "Trending" },
    { to: "/popular", icon: <GiMagicSwirl />, label: "Popular" },
    { to: "/movies", icon: <BiMoviePlay />, label: "Movies" },
    { to: "/tv", icon: <GiTv />, label: "TV Shows" },
    { to: "/people", icon: <AiOutlineTeam />, label: "People" },
    { to: "/games", icon: <GiGamepad />, label: "Games" },
  ];

  const infoLinks = [
    { to: "/about", icon: <IoIosInformationCircle />, label: "About Us" },
    { to: "/contact", icon: <FaSquarePhone />, label: "Contact" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden  fixed top-2 left-2 z-[110] w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-full text-black shadow-2xl active:scale-90 transition-transform"
      >
        {open ? <IoClose size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] md:hidden"
        />
      )}

      
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-[260px] bg-[#1F1E24] border-r border-white/5 flex flex-col z-[100] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-2xl md:shadow-none`}>

        <div className="p-8 pt-24 md:pt-10 select-none">
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tighter group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#6556CD] to-[#8b7ff0] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(101,86,205,0.4)] group-hover:rotate-12 transition-transform duration-300">
              <BiMoviePlay className="text-white text-xl" />
            </div>

            <span className="text-white">CINE</span>
            <span className="bg-gradient-to-r from-[#6556CD] to-[#a79cf1] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(101,86,205,0.3)]">
              VERSE
            </span>
          </h1>

          <p className="text-[10px] text-zinc-600 font-bold tracking-[4px] mt-1 ml-10">
            ULTRA HD
          </p>
        </div>
       
        <nav className="flex-1 px-4 overflow-y-auto scrollbar-hide select-none">

          <div className="mb-6">
            <p className="text-[10px] uppercase text-zinc-500 font-bold px-4 mb-3 tracking-[3px]">New Feeds</p>
            <div className="space-y-1">
              {feedLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${pathname === item.to ? "bg-yellow-500 text-black shadow-lg" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[15px] font-semibold whitespace-nowrap">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-white/5 mx-4 mb-6" />

          <div>
            <p className="text-[10px] uppercase text-zinc-500 font-bold px-4 mb-3 tracking-[3px]">Website Info</p>
            <div className="space-y-1">
              {infoLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${pathname === item.to ? "bg-yellow-500 text-black shadow-lg" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[15px] font-semibold whitespace-nowrap">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

       
        <div className="p-6">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-zinc-500 font-medium text-center">
              © 2026 CineVerse AI <br /> v1.0.2
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;