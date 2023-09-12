import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import registercss from './Register.module.css';
import classNames from 'classnames';
import Constants from '../Utilities/Constants';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import backButtonImage from '../images/back.png';


const RegisterPage = () => {

  const bootstrapSubmitClassName = 'btn btn-primary'; // Bootstrap class name
  const moduleSubmitClassName = registercss.submitbutton2; // Module CSS class name

  const ipAddress = '20.204.210.216';

  // Join the class names using classnames library
  const submitClassName = classNames(bootstrapSubmitClassName, moduleSubmitClassName);


  const navigate = useNavigate();

  const schema = yup.object().shape({
    FirstName: yup.string().required("FirstName is required"),
    LastName: yup.string().required("LastName is required"),
    Email: yup.string().email("Invalid email address").required("Email is required"),
    LoginId: yup.string().required("Login ID is required"),
    Password: yup.string().min(4).max(15).required("Password should be less than 15 characters"),
    Contact: yup.string().matches(/^\d{10}$/).required("Phone number is required")
  });

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = ({ FirstName, LastName, Email, LoginId, Password, Contact }) => {
    const url = `http://${ipAddress}/api/MovieBooking/Register`;
    const data =
    {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      LoginId: LoginId,
      Password: Password,
      Contact: Contact
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((data) => {
        data.text()
          .then((res) => {
            console.log(res);
            navigate('/');
          })
      })

      .catch((error) => {
        alert(error);
      });
  }

  const navigateTologin = () => {
    navigate('/');
  }

  return (

    <>
      <div className={registercss.background}>

        <Link to="/" className={registercss.backButton}>
          <img src={backButtonImage} alt="Back" />
        </Link>

        <div className={registercss.extraText1}>
          <span>Create your account and start</span>
        </div>
        <div className={registercss.extraText2}>
          booking your <span className={registercss.yellowText}>favorite movies!</span>
        </div>

        <div className={registercss.container}>


          <form onSubmit={handleSubmit(submitForm)}>

            <div className={registercss.fieldContainer}>
              <span className={registercss.span}>SIGN UP ON  BOOKSHOW</span>
              <div>
                <input type="text" name="FirstName" id="FirstName" placeholder="Enter firstname" {...register("FirstName")}
                  className={registercss.fieldstyle2} />
                <p style={{ color: "red" }}>{errors?.FirstName?.message}</p>
              </div>


              <div>
                <input type="text" name="LastName" id="LastName" placeholder="Enter Lastname" {...register("LastName")} className={registercss.fieldstyle2} />
                <p style={{ color: "red" }}>{errors?.LastName?.message}</p>
              </div>


              <div>
                <input type="email" name="Email" id="Email" placeholder="Enter Email" {...register("Email")} className={registercss.fieldstyle2} />
                <p style={{ color: "red" }}>{errors?.Email?.message}</p>
              </div>


              <div>
                <input type="text" name="LoginId" id="LoginId" placeholder="Enter LoginID"{...register("LoginId")} className={registercss.fieldstyle2} />
                <p style={{ color: "red" }}>{errors?.LoginId?.message}</p>
              </div>


              <div>
                <input type="password" name="Password" id="Password" placeholder="Enter Password" {...register("Password")} className={registercss.fieldstyle2} />
                <p style={{ color: "red" }}>{errors.Password?.message}</p>
              </div>


              <div>
                <input type="phone" name="Contact" id="Contact" placeholder="Enter Contact" {...register("Contact")} className={registercss.fieldstyle2} />
                {errors.Contact && (<p style={{ color: "red" }}>Phone Number is required </p>)}
              </div>

              <div>

                <button type="submit" className={submitClassName}>SIGN UP NOW</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  );

}




export default RegisterPage;