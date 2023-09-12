import React, { useEffect, useState } from 'react';
import claplogo from "../images/claplogo.jpg";
import deletecss from './DeleteMovie.module.css';
import classNames from 'classnames';
import Constants from '../Utilities/Constants';
import { useNavigate, Link } from 'react-router-dom';
import './DeleteMovie.css';
import { toast } from 'react-toastify';
import backButtonImage from '../images/back.png';

const DeleteMovie = () => {

    const [movielist, setMovieList] = useState([]);
    const navigate = useNavigate();
    const ipAddress = '20.204.210.216';

    const bootstrapInsidecard = 'card-body';
    const moduleInsidecard = deletecss.insideCard;
    const combinedInsidecard = classNames(bootstrapInsidecard, moduleInsidecard);

    const bootstrapBackClassName = 'btn btn-primary'; // Bootstrap class name
    const moduleBackClassName = deletecss.backbutton; // Module CSS class name
    const backClassName = classNames(bootstrapBackClassName, moduleBackClassName);

    const navigateToMoviePage = () => {
        navigate('/moviepage');
    }



    const DeleteMovie = (movieName) => {
        let jwttoken = sessionStorage.getItem('Jwttoken');
        const result = window.confirm('Are you sure you want to delete?');

        if (result) {
            const url = `${Constants.API_URL_DELETE}/${movieName}`

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + jwttoken
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    toast.success("Deleted Successfully")
                    navigate('/moviepage');
                })

                .catch((error) => {
                    alert(error);
                });
        }

        else {
            toast.error('Cancelled!');
        }
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

            })
            .catch((error) => {
                alert(error);
            });
    }


    useEffect(() => {
        getMoviedetails();

    }, [])

    return (
        <>
            <div className={deletecss.background}>
                <Link to="/moviepage" className={deletecss.backButton}>
                    <img src={backButtonImage} alt="Back" />
                </Link>
                <div className={deletecss.card} >
                    {movielist.map((data, index) => (

                        <div className={deletecss.cardadjust} key={index} data-testid={`movie-card-${index}`}>
                            <div className="card" style={{ width: "19rem" }}>

                                <img src={data.imageUrl} className={deletecss.cardimgtop} alt="..." />
                                <div className={combinedInsidecard} >
                                    <b><h4 className="card-title">{data.name}</h4></b>
                                    <p className="card-text" style={{ color: data.ticketStatus === 'BOOK ASAP' ? 'green' : 'red' }}>Ticket status:{data.ticketStatus}</p>
                                    <p className="card-text">Number of tickets available:{data.numberOfTickets}</p>
                                    <p><button className='btn btn-danger' onClick={() => DeleteMovie(data.name)}>Delete Movie</button></p>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}

export default DeleteMovie;