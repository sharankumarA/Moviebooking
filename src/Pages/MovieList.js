import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import movielistcss from './MovieList.module.css';
import claplogo from "../images/claplogo.jpg";
import classNames from 'classnames';
import Constants from '../Utilities/Constants';
import { getUserRolesFromToken } from '../Auth/Auth';
import backButtonImage from '../images/back.png';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";



const MovieListPage = (props) => {

    const navigate = useNavigate();

    const ipAddress = '20.204.210.216';


    const [movielist, setMovieList] = useState([]);
    const [movie, setMovie] = useState('');
    const [NoOfMovies, setNoOfMovies] = useState('');
    const [Issearchmovie, setIssearchmovie] = useState(false);



    const bootstrapSearchbutton = 'btn btn-primary';
    const moduleSearchbutton = movielistcss.searchbutton;

    const bootstrapInsidecard = 'card-body';
    const moduleInsidecard = movielistcss.insideCard;

    const bootstrapAllmovies = 'btn btn-primary';
    const moduleAllmovies = movielistcss.listbutton;

    // Join the class names using classnames library
    const combinedSearchbutton = classNames(bootstrapSearchbutton, moduleSearchbutton);
    const combinedInsidecard = classNames(bootstrapInsidecard, moduleInsidecard);
    const combinedAllmovies = classNames(bootstrapAllmovies, moduleAllmovies);



    const navigateToBookTickets = (data) => {

        console.log(data);
        props.name(data);
        navigate('/booktickets')
    }

    const schema = yup.object().shape({

    });

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const moviename = ({ search }) => {
        console.log(search);
        searchMovie(search);
    }

    function getMoviedetails() {

        let jwttoken = sessionStorage.getItem('Jwttoken');
        const url = `http://${ipAddress}/api/MovieBooking/All`;

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setMovieList(data);
                setNoOfMovies(data.length);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function searchMovie(movie) {

        if (movie.trim() === "") {
            setIssearchmovie(false);
            getMoviedetails();

        }

        if (movie.search) {
            let jwttoken = sessionStorage.getItem('Jwttoken');
            const url = `${Constants.API_URL_SEARCH}/${movie}`;

            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application.json',
                    'Authorization': 'bearer ' + jwttoken
                },

            })
                .then((response) => response.json())
                .then((data) => {
                    setMovie(data);
                    setIssearchmovie(true);
                })

        }
    }

    useEffect(() => {
        getMoviedetails();
    }, [Issearchmovie]);


    return (
        <>

            <hr className={movielistcss.navSeparator} />
            <div className={movielistcss.background}>
                <Link to="/login" className={movielistcss.backButton}>
                    <img src={backButtonImage} alt="Back" />
                </Link>
                <div className={movielistcss.searchContainer}>
                    <form onSubmit={handleSubmit(moviename)}>
                        <div className={movielistcss.searchInputContainer}>
                            <input type="text" name="search" placeholder="Search" {...register("search")} className={movielistcss.searchInput} />
                            <button type="submit" className={movielistcss.searchButton}>
                                <svg className={movielistcss.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.326a6.5 6.5 0 1 0-1.416 1.416l4.263 4.263a1 1 0 0 0 1.415-1.414l-4.263-4.263zm-5.242.74a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </form>
                </div>


                <span className={movielistcss.spandisplaymovie}>Now showing {!Issearchmovie ? NoOfMovies : movie.length} Movies</span>

                {(!Issearchmovie) &&
                    <div className={movielistcss.card}  >
                        {movielist.map((data, index) => (

                            <div className={movielistcss.cardadjust} key={index} >
                                <div className="card" style={{ width: "20em" }}>

                                    <img src={data.imageUrl} className={movielistcss.cardimgtop} alt="..." />
                                    <div className={combinedInsidecard} >
                                        <b><h4 className="card-title">{data.name}</h4></b>
                                        <p className="card-text" style={{ color: data.numberOfTickets === '0' ? 'red' : 'green' }}>Number of tickets available:{data.numberOfTickets}</p>
                                        <p className="card-text" style={{ color: data.ticketStatus === 'BOOK ASAP' ? 'green' : 'red' }}>{data.ticketStatus}</p>

                                        {(data.ticketStatus === 'BOOK ASAP') &&

                                            <p><a href="#" className={movielistcss.btnlink} onClick={() => navigateToBookTickets(data.name)}>BOOK TICKETS</a></p>
                                        }
                                        {(data.ticketStatus === 'SOLD OUT') &&
                                            <p><span className={movielistcss.textmuted}>SOLD OUT</span></p>
                                        }
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                }



                {(Issearchmovie) &&
                    <div className={movielistcss.card} >
                        {movie.map((data, index) => (

                            <div className={movielistcss.cardadjust} key={index} >
                                <div className="card" style={{ width: "19rem" }}>

                                    <img src={data.imageUrl} className={movielistcss.cardimgtop} alt="..." />

                                    <div className={combinedInsidecard} >
                                        <b><h4 className="card-title">{data.name}</h4></b>
                                        <p className="card-text">Number of tickets available:{data.numberOfTickets}</p>
                                        <p className="card-text" style={{ color: data.ticketStatus === 'BOOK ASAP' ? 'green' : 'red' }}>{data.ticketStatus}</p>

                                        {(data.ticketStatus === 'BOOK ASAP') &&
                                            <p><button className='btn btn-primary' onClick={() => navigateToBookTickets(data.name)}>BOOK TICKETS</button></p>
                                        }
                                        {(data.ticketStatus === 'SOLD OUT') &&
                                            <p><button className='btn btn-primary' disabled>BOOK TICKETS</button></p>
                                        }
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                }
            </div>
        </>
    )
}
export default MovieListPage;