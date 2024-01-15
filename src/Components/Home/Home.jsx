import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

const imgUrl = "https://image.tmdb.org/t/p/original"

const Card = ({img})=>(
    <img className='card' src={img} alt="cover" />
)

const Row = ({title,arr = [{
   }]})=>(
    <div className='row' >
        <h2>{title}</h2>
        <div>
            {
                arr.map((item,index)=>(
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }
        </div>
    </div>
)

const Home = () => {

    const [upcomingMovies, setUpcoming] = useState ([]);
    const [nowplayingMovies, setNowplaying] = useState ([]);
    const [popularMovies, setPopular] = useState ([]);
    const [topratedMovies, setToprated] = useState ([]);
    const [genre, setGenre] = useState ([]);

    useEffect(() => {
        
        const fetchUpcoming = async()=>{
            const {data :{results}} = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b43e76aac52fc4641453d55a6138fd64');
            setUpcoming(results);
        };
        const fetchNowplaying = async()=>{
            const {data :{results}} = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b43e76aac52fc4641453d55a6138fd64');
            setNowplaying(results);
        };
        const fetchPopular = async()=>{
            const {data :{results}} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b43e76aac52fc4641453d55a6138fd64');
            setPopular(results);
        };
        const fetchToprated = async()=>{
            const {data :{results}} = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b43e76aac52fc4641453d55a6138fd64');
            setToprated(results);
        };
        const getAllgenre = async()=>{
            const {data :{genres}} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b43e76aac52fc4641453d55a6138fd64');
            setGenre(genres);
        };
        
        getAllgenre();
        fetchUpcoming();
        fetchNowplaying();
        fetchPopular();
        fetchToprated();

    }, [])
    


  return (
    <section className="home">
        <div className="banner" style={{
            backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(17, 17, 17)"
        }} >
        </div>

        <Row title={"Upcoming"} arr={upcomingMovies} />
        <Row title={"Now Playing"} arr={nowplayingMovies} />
        <Row title={"Popular"} arr={popularMovies} />
        <Row title={"Top Rated"} arr={topratedMovies} />

        <div className="genreBox">
            {genre.map((item)=>(
                <Link key={item.id} to={`/genre/${item.id}`} > {item.name} </Link>
            ))}
        </div>
        
    </section>
  )
}

export default Home

// https://api.themoviedb.org/3/movie/popular?api_key=b43e76aac52fc4641453d55a6138fd64