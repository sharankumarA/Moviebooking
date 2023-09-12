import React from 'react';
import backgroundImage from "../images/Initial.jpg";
import initialPageCss from './InitialPage.module.css';
import logo from '../images/Applogo.png';
import { useNavigate } from 'react-router-dom';

const InitialPage = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className={initialPageCss.backgroundContainer}>
                <div className={initialPageCss.overlay}></div>

                <nav className={initialPageCss.navbar}>
                    <div className={initialPageCss.logo}>
                        <img src={logo} alt="Logo" className={initialPageCss.logoImage} />
                        <span className={initialPageCss.logoText}>BOOKSHOW</span>
                    </div>

                    <div className={initialPageCss.authButtons}>
                        <button className={initialPageCss.signupButton} onClick={() => navigate('/register')}>Sign Up</button>
                        <button className={initialPageCss.loginButton} onClick={() => navigate('/login')}>Login</button>
                    </div>
                </nav>

                <hr className={initialPageCss.navSeparator} />

                <div className={initialPageCss.centerText}>
                    <div className={initialPageCss.firstLine}>BOOK YOUR</div>
                    <div className={initialPageCss.secondLine}>
                        TICKETS FOR <span className={initialPageCss.yellowText}>MOVIES</span>
                    </div>
                    <div className={initialPageCss.smallText}>
                        Safe, Secure, Reliable Ticketing. Your Ticket to Live Entertainment!
                    </div>
                </div>
            </div>
        </>
    )
}

export default InitialPage;