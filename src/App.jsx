import React from 'react';
import Layout from './Layout';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import Game from './Components/Game';
import GameDetails from './GameDetails';
import Trending from './Components/Trending';
import Popular from './Components/Popular';
import Movies from './Components/Movies';
import Tv from './Components/Tv';
import People from './Components/People';
import PersonDetails from './Components/PersonDetails';
import DetailPage from './DetailPage';
import TrendingDetail from './Components/TrendingDetail';
import PopularDetails from './Components/PopularDetails';
import MoviesDetails from './Components/MoviesDetails';
import TvDetails from './Components/TvDetails';
import HorizontalDetails from './Components/partials/HorizontalDetails';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/games' element={<Game />} />
        <Route path='/trending' element={<Trending/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/tv' element={<Tv/>} />
        <Route path='/people' element={<People />} />

        
        <Route path="/horizontal/details/:id" element={<HorizontalDetails/>} />
        <Route path="/tv/details/:id" element={<TvDetails/>} />
        <Route path="/movies/details/:id" element={<MoviesDetails/>} />
        <Route path="/popular/details/:id" element={<PopularDetails/>} />
        <Route path="/trending/details/:id" element={<TrendingDetail/>} />
        <Route path="/details/:id" element={<DetailPage/>} />
        <Route path='/person/:id' element={<PersonDetails/>} />
        <Route path='/game/details/:id' element={<GameDetails />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;