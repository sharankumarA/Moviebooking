import React, { useState, createContext, useEffect } from "react";
import appcss from "./App.module.css";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import MovieListPage from "./Pages/MovieList";
import ForgetPasswordPage from "./Pages/ForgetPassword";
import Cart from "./Pages/Cart";
import BookTickets from "./Pages/BookTickets";
import 'bootstrap/dist/css/bootstrap.min.css';
import bookmyshowLogo from "./images/bookmyshowlogo.png";
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link, Navigate, useNavigate, Redirect } from "react-router-dom";
import logo from './images/Applogo.png';

import MoviePage from "./Admin/MoviePage";
import AddMovie from "./Admin/AddMovie";
import DeleteMovie from "./Admin/DeleteMovie";
import { getUserRolesFromToken } from '../src/Auth/Auth';
import NotFoundPage from "./Pages/NotFound";
import UpdateMovie from "./Admin/UpdateMovie";
import InitialPage from "./Pages/InitialPage";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movieName, setmovieName] = useState('');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('Jwttoken');
    sessionStorage.removeItem('Role');
    navigate('/');

  };
  const name = (name) => {
    setmovieName(name);
    console.log("new" + name);
  }
  const DisplayCart = (data) => {
    setRole(data);
    console.log("from app.js" + data);
    console.log("Role state app.js" + data);
  }


  // const hasRole = (role) => userRoles.includes(role);
  //const TicketURL = `/booktickets/${movieName}`;

  const bootstrapLogoutClassName = 'btn btn-danger';
  const moduleLogoutClassName = appcss.logoutbutton;
  const LogoutClassName = classNames(bootstrapLogoutClassName, moduleLogoutClassName);

  const AdminbootstrapLogoutClassName = 'btn btn-danger';
  const AdminmoduleLogoutClassName = appcss.Adminlogoutbutton;
  const AdminLogoutClassName = classNames(AdminbootstrapLogoutClassName, AdminmoduleLogoutClassName);



  const logoutdata = (data) => {
    setIsLoggedIn(data);

  }
  useEffect(() => {

  }, [])

  return (


    <div>
      <ToastContainer />

      {isLoggedIn &&
        <nav className={appcss.navbar}>
          <div className={appcss.logo}>
            <img src={logo} alt="Logo" className={appcss.logoImage} />
            <span className={appcss.logoText}>BOOKSHOW</span>
          </div>
          {isLoggedIn && role !== 'users' && (
            <button className={appcss.signupButton} onClick={handleLogout}> Logout</button>
          )}
          {isLoggedIn && role === 'users' && (
            <div className={appcss.authButtons}>
              <Link to="/cartdetails" ><button className={appcss.bookingbutton}>Bookings</button></Link>
              <button className={appcss.signupButton} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      }

      <Routes>

        <Route path="/login" element={<LoginPage setIsLoggedIn={logoutdata} checkuser={DisplayCart} />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />

        <Route path='/movielist' element={<MovieListPage name={name} />} />

        <Route path='/booktickets' element={<BookTickets movieName={movieName} />} />

        <Route path='/cartdetails' element={<Cart />} />

        <Route path='/moviepage' element={<MoviePage />} />

        <Route path='/addmovie' element={<AddMovie />} />

        <Route path='/deletemovie' element={<DeleteMovie />} />

        <Route path='/updatemovie' element={<UpdateMovie />} />

        <Route path='*' element={<NotFoundPage />} />

        <Route path='/' element={<InitialPage />} />

      </Routes>
    </div>

  );
}



export default App;

