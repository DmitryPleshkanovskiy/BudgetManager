import React from 'react';
import { Link } from 'react-router';

import './welcomePage.scss';

const WelcomePage = (props) => {
	return (
        <div className="container-fluid welcome-page-container"> 
            <div className="welcomePanel">
                <h1>Welcome!</h1>
                <p>
                    This service created to help you manage your finances
                </p>
                <p>
                    <Link className="btn btn-success" to="/signup">SignUp</Link> <Link className="btn btn-primary" to="/login">LogIn</Link> 
                </p>
            </div>
        </div>
    )
};

export default WelcomePage;