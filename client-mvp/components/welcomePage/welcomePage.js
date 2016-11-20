import React from 'react';
import './welcomePage.scss';

const WelcomePage = (props) => {
	return (
        <div>
            <div className="welcome-page-container"> 
                <div className="welcomePanel">
                    <h1>Welcome!</h1>
                    <p>
                        This service created to help you manage your finances
                    </p>
                    <p>
                        <a className="btn btn-success" href="/SignUp">SignUp</a> <a className="btn btn-primary" href="/login">LogIn</a> 
                    </p>
                </div>
            </div>
        </div>
    )
};

export default WelcomePage;