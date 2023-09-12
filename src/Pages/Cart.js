import React, { useState, useEffect } from 'react';
import Constants from '../Utilities/Constants';
import './CartPage.css';
import cartcss from './cart.module.css';
import { Navigate, useNavigate, Link } from "react-router-dom";
import classNames from 'classnames';
import backButtonImage from '../images/back.png';

import { Container, Table } from 'react-bootstrap';

const Cart = () => {
    const [cartDetails, setCartDetails] = useState([]);
    const navigate = useNavigate();

    const bootstrapClassName = 'btn btn-primary'; // Bootstrap class name
    const moduleClassName = cartcss.backbutton; // Module CSS class name

    const combinedClassName = classNames(bootstrapClassName, moduleClassName);

    const navigateToMovie = () => {
        navigate('/movielist');
    }


    useEffect(() => {

        let jwttoken = sessionStorage.getItem('Jwttoken');
        var username = sessionStorage.getItem('username');
        const URL = `${Constants.API_URL_CART}/${username}`

        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
                'Authorization': 'bearer ' + jwttoken
            }

        })
            .then((response) => response.json())
            .then((data) => {
                setCartDetails(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching cart details:', error);
            });
    }, []);

    return (
        <>
            <hr className={cartcss.navSeparator} />
            <div className={cartcss.background}>
                <Link to="/movielist" className={cartcss.backButton}>
                    <img src={backButtonImage} alt="Back" />
                </Link>

                <div className={cartcss.extraText1}>
                    My <span className={cartcss.yellowText}>Bookings!</span>
                </div>


                <div className="cardadjust">
                    {cartDetails.map((ticket, index) => (
                        <div className="card ticket-card" style={{ display: "-webkit-inline-flex" }}>
                            <div className="card-body" style={{ width: "250px", height: "250px" }}>
                                <b><h3 className="card-title">{ticket.movieName}</h3></b>
                                <div className="theatre-info">
                                    <p className="card-text">Theatre: {ticket.theatreName}</p>
                                </div>
                                <p className="card-text seat-info">Seat Number: {ticket.seatNumber.join(', ')}</p>
                                <div className="movie-info">
                                    <p className="card-text">No. of Tickets: <span className="ticket-count">{ticket.numberOfTickets}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}


                    {
                        cartDetails.length === 0 &&
                        <h4 style={{ textAlign: "center", color: "red" }}>No booking found!</h4>
                    }
                </div>

            </div >
        </>

    )
}

export default Cart;