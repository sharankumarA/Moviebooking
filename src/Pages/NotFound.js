// NotFoundPage.js

import React from 'react';
import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={style.notfoundcontainer}>
            <div className={style.notfoundcontent}>
                <h1 style={{
                    fontsSize: "6rem",
                    color: "#f76c6c",
                    marginBottom: "20px"
                }}>404</h1>
                <p className={style.pNotFound}>Page Not Found</p>
                <p className={style.pNotFound}>Sorry, the page you are looking for does not exist.</p>
                <a href="/" className={style.aNotFound}>Go back to Home</a>
            </div>
        </div >
    );
};

export default NotFoundPage;
