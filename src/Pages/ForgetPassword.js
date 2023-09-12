import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import forgetcss from './ForgetPassword.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import Constants from '../Utilities/Constants';
import backButtonImage from '../images/back.png';

const ForgetPasswordPage = () => {

  const bootstrapSubmitClassName = 'btn btn-primary'; // Bootstrap class name
  const moduleSubmitClassName = forgetcss.submitbutton3; // Module CSS class name




  // Join the class names using classnames library
  const submitClassName = classNames(bootstrapSubmitClassName, moduleSubmitClassName);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().min(4).required("Username is required"),
    newpassword: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = ({ username, newpassword }) => {

    const API_BASE_URL = `${Constants.API_URL_FORGET}/${username}/${newpassword}`


    fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application.json'
      }

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
      <div className={forgetcss.background}>
        <Link to="/login" className={forgetcss.backButton}>
          <img src={backButtonImage} alt="Back" />
        </Link>
        <span className={forgetcss.span}>Forgot Your <span className={forgetcss.yellowText}>Password?</span></span>
        <div className={forgetcss.instructions}>
          <span>Don't worry, we've got you covered!</span>
        </div>
        <div className={forgetcss.container}>
          <form onSubmit={handleSubmit(submitForm)}>
            <div >
              <label htmlFor="username">Username*</label>
            </div>
            <div>
              <input type="text" name="username"  {...register("username")} className={forgetcss.fieldstyle3} id="username" />
              <p style={{ color: "red" }}>{errors.username?.message}</p>
            </div>

            <div >
              <label htmlFor="newpassword">New Password*</label>
            </div>
            <div>
              <input type="password" name="newpassword"  {...register("newpassword")} className={forgetcss.fieldstyle3} id="newpassword" />
              <p style={{ color: "red" }}>{errors.newpassword?.message}</p>
            </div>

            <div className={forgetcss.buttonGroup}>
              <button type="submit" className={submitClassName}>Confirm</button>
            </div>

          </form>
        </div>
      </div>
    </>
  );

}




export default ForgetPasswordPage;