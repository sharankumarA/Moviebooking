import React, { useEffect, useState } from "react";
import ForgetPasswordPage from "./ForgetPassword";
import RegisterPage from "./Register";
import Constants from '../Utilities/Constants';
import logincss from './Login.module.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { getUserRolesFromToken } from '../Auth/Auth';
import backButtonImage from '../images/back.png';


const LoginPage = (props) => {

  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [userRoles, setUserRoles] = useState([]);

  const bootstrapClassName = 'btn btn-primary'; // Bootstrap class name
  const moduleClassName = logincss.submitbutton1; // Module CSS class name

  const combinedClassName = classNames(bootstrapClassName, moduleClassName);

  const schema = yup.object().shape({
    loginId: yup.string().required("LoginId is required"),
    password: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });



  const submitForm = ({ loginId, password }, e) => {

    e.preventDefault();
    sessionStorage.setItem('username', loginId);

    const url = `${Constants.API_URL_LOGIN}/${loginId}/${password}`;

    try {

      fetch(url, {
        method: 'GET',
      })
        .then((data) => {
          data.text()
            .then((token) => {
              if (token === 'wrong credentials') {
                console.log(token);
                toast.error('Incorrect login ID or password');
                reset();
              }
              else {
                const roles = getUserRolesFromToken(token);
                setToken(token);
                localStorage.setItem('Jwttoken', token);
                sessionStorage.setItem('Jwttoken', token);
                props.setIsLoggedIn(true);

                console.log(token);
                if (roles.includes('admin')) {
                  console.log(roles);
                  props.checkuser(roles);
                  navigate('/moviepage');
                } else if (roles.includes('users')) {
                  console.log(roles);
                  props.checkuser(roles);
                  navigate('/movielist');
                }
              }

            })
        })
    }
    catch (error) {
      console.log("Login failed due to " + error.message);
    }


  }

  return (
    <>
      <div className={logincss.background}>
        <Link to="/" className={logincss.backButton}>
          <img src={backButtonImage} alt="Back" />
        </Link>
        <div className={logincss.extraText1}>
          Welcome to our <span className={logincss.yellowText}>BookShow!</span>
        </div>
        <div className={logincss.extraText2}>
          <span>Enjoy seamless movie ticket booking experience!</span>
        </div>
        <div className={logincss.container}>
          <form onSubmit={handleSubmit(submitForm)}>
            <h2 className={logincss.h2}>SIGN IN</h2>
            <div>
              <label htmlFor="loginId">LoginID*</label>
            </div>
            <div>
              <input type="text" name="loginId"  {...register("loginId")} className={logincss.fieldstyle1} id="loginId" />
              <p style={{ color: "red" }}>{errors.loginId?.message}</p>
            </div>

            <div>
              <label htmlFor="password">Password*</label>
            </div>
            <div>
              <input type="password" name="password"   {...register("password")} className={logincss.fieldstyle1} id="password" />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
            </div>

            <div >
              <Link to="/forgetpassword">Forget Password?</Link>
              <br></br>
            </div>
            <div>
              <label>Don't have an account yet?</label>
              <Link to="/register">Register</Link>
              <br></br>
            </div>
            <div>
              <button type="submit" className={combinedClassName}>Login</button>
            </div>

          </form >
        </div >
      </div >

    </>
  );

}




export default LoginPage;
