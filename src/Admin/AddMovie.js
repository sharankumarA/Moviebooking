import React, { useState } from 'react';
import addcss from './AddMovie.module.css';
import { useForm } from "react-hook-form";
import Constants from '../Utilities/Constants';
import * as yup from 'yup';
import { Navigate, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { toast } from 'react-toastify';

const AddMovie = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');

    const navigate = useNavigate('');

    const bootstrapSubmitClassName = 'btn btn-primary';
    const moduleSubmitClassName = addcss.submitbutton;

    const bootstrapBackClassName = 'btn btn-warning';
    const moduleBackClassName = addcss.backbutton;


    // Join the class names using classnames library
    const submitClassName = classNames(bootstrapSubmitClassName, moduleSubmitClassName);
    const backClassName = classNames(bootstrapBackClassName, moduleBackClassName);

    const backToMoviePage = () => {
        navigate('/moviepage')
    }
    const schema = yup.object().shape({

        MovieName: yup.string().required("Movie name is required"),
        TheatreName: yup.string().required("Theatre name is required"),
        NoOfTickets: yup.string().required("Please enter total ticket"),
        status: yup.string().required("Please select status"),
        ImageURL: yup.string().required("Please enter Image URL"),

    });

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = ({ MovieName, TheatreName, NoOfTickets, status, ImageURL }) => {
        let jwttoken = sessionStorage.getItem('Jwttoken');
        console.log(MovieName);
        console.log(TheatreName);
        console.log(NoOfTickets);
        console.log(status);

        const url = Constants.API_URL_ADD;
        const data =
        {
            name: MovieName,
            theatreName: TheatreName,
            numberOfTickets: NoOfTickets,
            ticketStatus: status,
            imageUrl: ImageURL
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
                reset();
                toast.success("Movie added successfully");
                navigate('/moviepage');
            })

            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div className={addcss.background}>
            <div className={addcss.textContainer}>
                <span className={addcss.h2}>Add Movies</span>
                <p className={addcss.p}>Provide the details of the new movie below:</p>
            </div>

            <div className={addcss.ModalContent}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <label>Movie Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="MovieName"
                            placeholder="Enter Movie Name"
                            {...register("MovieName")}
                            className={addcss.field}
                        />
                        <p style={{ color: "red" }}>{errors?.MovieName?.message}</p>
                    </div>

                    <div>
                        <label>Theatre Name</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="TheatreName"
                            placeholder="Enter Theatre Name"
                            {...register("TheatreName")}
                            className={addcss.field}
                        />
                        <p style={{ color: "red" }}>{errors?.TheatreName?.message}</p>
                    </div>
                    <div>
                        <label>Number Of Tickets</label>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="NoOfTickets"
                            placeholder="Enter Total Tickets"
                            {...register("NoOfTickets")}
                            className={addcss.field}
                        />
                        <p style={{ color: "red" }}>{errors?.NoOfTickets?.message}</p>
                    </div>

                    <div>
                        <label>Ticket Status</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="BOOKASAP"
                            value="BOOK ASAP"
                            id="BOOKASAP"
                            {...register("status")}
                        />
                        <label htmlFor="BOOKASAP">BOOK ASAP</label>
                        &nbsp;&nbsp;&nbsp;
                        <input
                            type="radio"
                            name="SOLDOUT"
                            value="SOLD OUT"
                            id="SOLDOUT"
                            {...register("status")}
                        />
                        <label htmlFor="SOLDOUT">SOLD OUT</label>
                        <p style={{ color: "red" }}>{errors?.status?.message}</p>
                    </div>
                    <div>
                        <label>Image URL</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="ImageURL"
                            placeholder="Enter Image URL"
                            {...register("ImageURL")}
                            className={addcss.field}
                        />
                        <p style={{ color: "red" }}>{errors?.ImageURL?.message}</p>
                    </div>

                    <div className={addcss.buttonalign}>
                        <button
                            type="button"
                            className={backClassName}
                            onClick={backToMoviePage}
                        >
                            Cancel
                        </button>

                        <button type="submit" className={submitClassName}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default AddMovie;
