import React, { useEffect, useState } from 'react';
import ticketstyle from './BookTicket.module.css';
import classNames from 'classnames';
import { Navigate, useNavigate, Link } from "react-router-dom";
import Constants from '../Utilities/Constants';
import './Box.css';
import { toast } from 'react-toastify';
import screen from '../images/bg-screen.png';
import backButtonImage from '../images/back.png';

const BookTickets = (props) => {


    const MovieName = props.movieName;
    const ipAddress = '20.204.210.216';

    const [username, setusername] = useState('');  //3 username
    const [theaterNames, setTheaterNames] = useState([]);
    const [ticketcount, setTicketcount] = useState('');
    const [restrictseat, setRestrictseat] = useState(''); //2 No of tickets
    const [selectedseats, setSelectedseats] = useState([]); //4 seat numbers
    const [seatNumbers, setSeatNumbers] = useState([]);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');  //1 theatre name
    const [initialTicketCount, setInitialTicketCount] = useState('');



    const bootstrapSubmitClassName = 'btn btn-primary';
    const moduleSubmitClassName = ticketstyle.submitbutton;

    const bootstrapBackClassName = 'btn btn-warning';
    const moduleBackClassName = ticketstyle.backbutton;

    const submitClassName = classNames(bootstrapSubmitClassName, moduleSubmitClassName);
    const backClassName = classNames(bootstrapBackClassName, moduleBackClassName);


    const handleClick = (number) => {
        if (selectedseats.length < restrictseat) {
            // Check if the clicked seat number is already selected
            setSelectedseats((prevSelectedSeats) => {
                if (prevSelectedSeats.includes(number)) {
                    // If it's already selected, remove it from the array
                    return prevSelectedSeats.filter((seat) => seat !== number);
                } else {
                    // If it's not selected, add it to the array
                    return [...prevSelectedSeats, number];
                }
            });
        } else {
            // If the user has already selected the maximum number of seats, allow unselecting the seat
            setSelectedseats((prevSelectedSeats) =>
                prevSelectedSeats.includes(number) ? prevSelectedSeats.filter((seat) => seat !== number) : prevSelectedSeats
            );
        }
        console.log(selectedseats);
    };

    const handleBookTickets = () => {
        if (selectedseats.length < restrictseat) {
            toast.error('Select correct seats');
        }
        else {
            const dataToSend = {
                TheatreName: selectedOption,
                NumberOfTickets: restrictseat,
                UserName: username,
                SeatNumber: selectedseats
            };
            const bookticketurl = `http://${ipAddress}/api/MovieBooking/${MovieName}/booktickets`
            let jwttoken = sessionStorage.getItem('Jwttoken');
            fetch(bookticketurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + jwttoken
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => {

                    if (response.ok) {
                        toast.success('Seats booked successfully!');
                        navigate('/cartdetails');

                    }
                })
                .catch((error) => {
                    console.error('Error booking seats:', error);
                    toast.error('Failed to book seats. Please try again.');
                });
        }
    }
    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedseats([]);
        setSeatNumbers([]);

        setSelectedOption(selectedValue);

        const ticketcounturl = `${Constants.API_URL_TICKETCOUNT}/${MovieName}/${e.target.value}`

        fetch(ticketcounturl, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((ticketcount) => {
                setTicketcount(ticketcount);

                console.log(ticketcount);
            })
            .catch((error) => console.error('Error fetching data:', error));


        const bookedticketcount = `${Constants.API_URL_BOOKEDTICKETCOUNT}/${MovieName}/${e.target.value}`
        fetch(bookedticketcount, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((seatnumber) => {
                setSeatNumbers(seatnumber);
                console.log(seatnumber);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };



    const navigateToMovie = () => {
        navigate('/movielist');
    }




    useEffect(() => {

        setusername(sessionStorage.getItem('username'));
        const url = `${Constants.API_URL_THEATRE}/${MovieName}`

        console.log("Inside useeffect" + MovieName);

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((theatrename) => {
                setTheaterNames(theatrename);
                console.log(theatrename);
            })
            .catch((error) => console.error('Error fetching data:', error));

        console.log("Selected seats updated:", selectedseats);


    }, [selectedseats])




    const numbers = Array.from({ length: ticketcount }, (_, index) => index + 1);

    const renderSeats = () => {
        // to check if the seat is booked
        const isSeatBooked = (number) => {
            return seatNumbers.includes(number);
        };

        // Return the JSX for rendering the seats
        return numbers.map((number, index) => {
            const isBooked = isSeatBooked(number);
            return (
                <div
                    key={index}
                    className={classNames(ticketstyle.seat, {
                        [ticketstyle.bookedSeat]: isBooked,
                        [ticketstyle.selectedSeat]: selectedseats.includes(number)
                    })}
                    onClick={() => handleClick(number)}

                >
                    {number}
                </div>
            );
        });
    };


    return (
        <>
            <hr className={ticketstyle.navSeparator} />
            <div className={ticketstyle.background}>
                <Link to="/movielist" className={ticketstyle.backButton}>
                    <img src={backButtonImage} alt="Back" />
                </Link>
                <div className={ticketstyle.extraText1}>
                    Book your <span className={ticketstyle.yellowText}>tickets here!</span>
                </div>

                <div className={ticketstyle.container}>

                    <div>
                        <label className={ticketstyle.formLabel}>Select a theater:</label>
                    </div>
                    <div >
                        <select id="dropdown" className={ticketstyle.dropdowncontainer} value={selectedOption} onChange={handleDropdownChange}>
                            <option style={{ color: "#888" }} selected hidden>--Please select theatre--</option>
                            {theaterNames.map((data, index) => (
                                <option key={index} value={data}>
                                    {data}
                                </option>

                            ))}

                        </select>

                    </div>

                    <br></br>

                    <div>
                        <label className={ticketstyle.formLabel}>Number of tickets:</label>
                        <input type="number" name="nooftickets" min={1} className={ticketstyle.NoOfTickets} value={restrictseat}
                            onChange={(e) => setRestrictseat(e.target.value)} />
                    </div>



                    <div>
                        <label className={ticketstyle.formLabel}>Username:</label>
                        <input type="text" value={username} className={ticketstyle.NoOfTickets} disabled />
                    </div>


                    <br></br>
                    <label className={ticketstyle.formLabel}>Choose seat:</label>
                    <div>
                        <img src={screen} alt="Logo" className={ticketstyle.screenImage} />
                    </div>
                    <div className={ticketstyle.seatcontainer}>
                        {renderSeats()}
                    </div>
                    <br></br>
                    <div>
                        <button onClick={navigateToMovie} className={backClassName}>Back</button>
                        <button type="submit" className={submitClassName} onClick={handleBookTickets}>Book</button>
                    </div>

                </div >

            </div>
        </>
    )
}

export default BookTickets;