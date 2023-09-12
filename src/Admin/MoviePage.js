import React, { useEffect, useState } from 'react';
import moviecss from './MoviePage.module.css';
import Constants from '../Utilities/Constants';
import { useNavigate } from "react-router-dom";
import './MoviePage.css';
import { Link } from 'react-router-dom';
import './MoviePageAval.css';


const MoviePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movielist, setMovieList] = useState([]);
    const [movie, setFirstmovie] = useState('');
    const [ticketbooked, setTicketbooked] = useState([]);
    const [ticketavaliable, setTicketavaliable] = useState('');
    const [noticketbooked, setNoticketbooked] = useState('');
    const [noticketavaliable, setNoticketavaliable] = useState('');

    const [selectedTab, setSelectedTab] = useState('');
    const [ticketAvailableStatus, setTicketAvailableStatus] = useState([]);

    const navigate = useNavigate('');

    const ipAddress = '20.204.210.216';


    const addMovie = () => {
        navigate('/addmovie');
    }
    const deleteMovie = () => {
        navigate('/deletemovie');
    }
    const updateMovie = () => {
        navigate('/updatemovie');
    }

    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(e.target.value);
        let jwttoken = sessionStorage.getItem('Jwttoken');
        const Bookedurl = `${Constants.API_URL_TICKETBOOKED}/${e.target.value}`
        fetch(Bookedurl, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        })
            .then(response => {
                if (!response.ok) {
                    setNoticketbooked("No bookings");
                    setTicketbooked('');
                }
                return response.json();
            })
            .then((data) => {
                setTicketbooked(data);
                setNoticketbooked('');
                console.log(data);
            })
            .catch((error) => {
                console.log(noticketbooked);
            });



        const Availableurl = `${Constants.API_URL_TICKETAVAILABLE}/${e.target.value}`
        fetch(Availableurl, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        })
            .then(response => {
                if (!response.ok) {
                    setNoticketavaliable("No tickets available");
                }
                return response.json();
            })
            .then((data) => {
                setTicketavaliable(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(noticketbooked);
            });

    };



    function getMoviedetails() {
        setSelectedTab("ticketsAvailable");
        let jwttoken = sessionStorage.getItem('Jwttoken');
        const url = `http://${ipAddress}/api/MovieBooking/All/moviestatus`;

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }

        })
            .then(response => {
                if (!response.ok) {
                    setNoticketavaliable("No tickets available");
                    setTicketAvailableStatus([]);
                }
                return response.json();
            })
            .then((data) => {
                setMovieList(data);
                setTicketAvailableStatus(data);
                console.log(data);
            })
            .catch((error) => {
                alert(error);
            });
    }
    const handleTicketsBookedLinkClick = () => {
        setSelectedTab("ticketsBooked");

        let jwttoken = sessionStorage.getItem('Jwttoken');
        const Bookedurl = Constants.API_URL_TICKETBOOKED;
        fetch(Bookedurl, {
            method: "GET",
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        })
            .then(response => {
                if (!response.ok) {
                    setSelectedTab("ticketsbooked");
                    setNoticketbooked("No bookings");
                    setTicketbooked([]);
                }
                return response.json();
            })
            .then((data) => {
                setTicketbooked(data);
                setNoticketbooked('');
                console.log(data);
            })
            .catch((error) => {
                console.log(noticketbooked);
            });
    };


    useEffect(() => {
        getMoviedetails();
        setSelectedTab("ticketsAvailable");
        console.log("firstmovie" + movie);
        console.log(selectedTab);
    }, [])


    return (


        <div className={moviecss.background}>

            <div className={moviecss.sidebar}>
                <div className={moviecss.extraText1}>
                    Welcome, <span className={moviecss.yellowText}>Admin!</span>
                </div>
                <ul className={moviecss.navLinks}>
                    <li>
                        <Link
                            className={selectedTab === "ticketsAvailable" ? `${moviecss.navLink} ${moviecss.activeNavLink}` : moviecss.navLink}
                            onClick={getMoviedetails}>
                            Tickets Available
                        </Link>
                    </li>
                    <li>
                        <Link className={selectedTab === "ticketsBooked" ? `${moviecss.navLink} ${moviecss.activeNavLink}` : moviecss.navLink}
                            onClick={handleTicketsBookedLinkClick} >
                            Tickets Booked
                        </Link>
                    </li>
                    <li>
                        <Link to="/addmovie" className={moviecss.navLink}>
                            Add Movie
                        </Link>
                    </li>
                    <li>
                        <Link to="/deletemovie" className={moviecss.navLink}>
                            Delete Movie
                        </Link>
                    </li>
                    <li>
                        <Link to="/updatemovie" className={moviecss.navLink}>
                            Update Movie
                        </Link>
                    </li>
                </ul>
            </div>


            <div className={moviecss.centerContent}>
                {selectedTab === "ticketsAvailable" && (
                    <div className={moviecss.ticketAvailableContainer}>

                        {ticketAvailableStatus.map((movieStatus, index) => (
                            <div key={index} className={moviecss.movieContainer}>
                                <div className={moviecss.movieImage}>

                                    <img src={movieStatus.imageUrl} alt="..." style={{ width: '150px', height: '150px' }} />
                                </div>
                                <div className={moviecss.movieDetails}>
                                    <span className={moviecss.titlename}>Tickets Available</span>
                                    <p className={moviecss.fieldname}>Movie: {movieStatus.name}</p>
                                    <p className={moviecss.fieldname}> Ticket Status: {movieStatus.theatreName}</p>
                                    <p className={moviecss.fieldname}> Ticket Status: {movieStatus.ticketStatus}</p>
                                    <p className={moviecss.fieldname}> Tickets Available: {movieStatus.numberOfTickets}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedTab === "ticketsBooked" && (
                    <div className={moviecss.ticketAvailableContainer}>

                        {ticketbooked.map((movieStatus, index) => (
                            <div key={index} className={moviecss.movieContainer}>
                                <div className={moviecss.movieImage}>

                                    <img src={movieStatus.imageUrl} alt="..." style={{ width: '150px', height: '150px' }} />
                                </div>
                                <div className={moviecss.movieDetails}>
                                    <span className={moviecss.titlename}>Tickets Booked</span>
                                    <p className={moviecss.fieldname}>Movie: {movieStatus.movieName}</p>
                                    <p className={moviecss.fieldname}> Tickets Booked: {movieStatus.numberOfTickets}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>



    )
}


export default MoviePage;
