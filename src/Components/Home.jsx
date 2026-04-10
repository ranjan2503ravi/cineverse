import React from "react";
import Sidebar from "./partials/Sidebar"
import TopNav from "./partials/TopNav";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import LatestTrailers from "./partials/LatestTrailers";
import Footer from "./partials/Footer";
const Home = () => {
  document.title = "CineVerse | Home";

  return (
    <div className='flex h-screen w-full bg-[#1F1E24] overflow-hidden'>

      <Sidebar />

      <div className='flex-1 h-full overflow-y-auto bg-[#1F1E24]'>
        <TopNav /> 
        <Header />
        <HorizontalCards />
        <LatestTrailers />
        <Footer/>
      </div>
    </div>
  );
};
export default Home