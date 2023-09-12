import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Constants from '../Utilities/Constants';
import * as yup from 'yup';
import { Navigate, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { toast } from 'react-toastify';
import './UpdateMovie.css';
import updatecss from './UpdateMovie.module.css';


const UpdateMovie = () => {

    const [movielist, setMovieList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');  // Has movie name
    const [theaterNames, setTheaterNames] = useState([]);
    const [theatreOption, settheatreOption] = useState('');  //Has thetare name
    const [ticketsCount, setTicketsCount] = useState('');
    const [movieStatus, setMovieStatus] = useState('');
    const [ticketCountError, setTicketCountError] = useState('');
    const [statusError, setStatusError] = useState('');

    const navigate = useNavigate('');
    const ipAddress = '20.204.210.216';

    const bootstrapSubmitClassName = 'btn btn-primary';
    const moduleSubmitClassName = updatecss.submitbutton;

    const bootstrapBackClassName = 'btn btn-warning';
    const moduleBackClassName = updatecss.backbutton;


    // Join the class names using classnames library
    const submitClassName = classNames(bootstrapSubmitClassName, moduleSubmitClassName);
    const backClassName = classNames(bootstrapBackClassName, moduleBackClassName);

    const backToMoviePage = () => {
        navigate('/moviepage')
    }


    const schema = {
        MovieName: {
            required: "Movie name is required",
        },
        TheatreName: {
            required: "Theatre name is required",
        },
    };



    const submitForm = (e) => {
        let jwttoken = sessionStorage.getItem('Jwttoken');
        e.preventDefault();

        if (!ticketsCount || isNaN(ticketsCount) || ticketsCount < 0) {
            setTicketCountError('Please enter a valid number of tickets');
            return;
        }

        const url = Constants.API_URL_UPDATE;
        const data =
        {
            name: selectedOption,
            theatreName: theatreOption,
            numberOfTickets: ticketsCount,
            ticketStatus: movieStatus
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + jwttoken
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                toast.success("Updated successfully");

            })

            .catch((error) => {
                alert(error);
            });
        navigate('/moviepage');




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
                console.log(data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        getMoviedetails();

    }, [])

    const handletheatrechange = (e) => {
        settheatreOption(e.target.value);

        console.log("from handle dropdown theatre change" + selectedOption);
        const url = `${Constants.API_URL_TICKETCOUNTANDSTATUS}/${selectedOption}/${e.target.value}`


        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setTicketsCount(data.numberOfTickets);
                setMovieStatus(data.ticketStatus);
            })
            .catch((error) => console.error('Error fetching data:', error));



    }

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);

        const url = `${Constants.API_URL_THEATRE}/${e.target.value}`


        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((theatrename) => {
                setTheaterNames(theatrename);
                console.log(theatrename);
            })
            .catch((error) => console.error('Error fetching data:', error));




    }
    return (
        <>
            <div className={updatecss.background}>
                <div className={updatecss.textContainer}>
                    <span className={updatecss.h2}>Update Movies</span>
                    <p className={updatecss.p}>Provide the details to update movie below:</p>
                </div>

                <div className={updatecss.ModalContent}>
                    <form onSubmit={submitForm}>


                        <br></br>
                        <div>
                            <label>Movie Name</label>
                        </div>

                        <div >
                            <select id="dropdown" value={selectedOption} className={updatecss.field} onChange={handleDropdownChange}>
                                <option style={{ color: "#888" }} value="" hidden>--Please select Movie--</option>
                                {movielist.map((data, index) => (

                                    <option key={index} value={data.name}>
                                        {data.name}

                                    </option>
                                ))}
                            </select>

                        </div>
                        <br></br>
                        <div>
                            <label>Theatre Name</label>
                        </div>
                        <div >
                            <select id="dropdown" value={theatreOption} className={updatecss.field} onChange={handletheatrechange}>
                                <option style={{ color: "#888" }} value="" hidden>--Please select theatre--</option>
                                {theaterNames.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>

                                ))}

                            </select>

                        </div>
                        <br></br>

                        <div>
                            <label>Number Of Tickets</label>
                        </div>
                        <div>
                            <input
                                type="number"
                                name="NoOfTickets"
                                value={ticketsCount}
                                onChange={(e) => { setTicketsCount(e.target.value); setTicketCountError(''); }}
                                placeholder="Enter Total Tickets"
                                className={updatecss.field}

                            />
                        </div>
                        <div>
                            <p style={{ color: "red" }}>{ticketCountError}</p>
                        </div>

                        <div>
                            <label >Ticket Status</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="BOOKASAP"
                                value="BOOK ASAP"
                                checked={movieStatus === 'BOOK ASAP'}
                                onChange={() => setMovieStatus('BOOK ASAP')}
                                id="BOOKASAP"

                            />
                            <label htmlFor="BOOKASAP">BOOK ASAP</label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="radio"
                                name="SOLDOUT"
                                value="SOLD OUT"
                                checked={movieStatus === 'SOLD OUT'}
                                onChange={() => setMovieStatus('SOLD OUT')}
                                id="SOLDOUT"

                            />
                            <label htmlFor="BOOKASAP">SOLD OUT</label>
                            {statusError && <p style={{ color: "red" }}>{statusError}</p>}
                        </div>
                        <div className={updatecss.buttonalign}>
                            <button type="button" className={backClassName} onClick={backToMoviePage}>Cancel</button>

                            <button type="submit" className={submitClassName}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateMovie;