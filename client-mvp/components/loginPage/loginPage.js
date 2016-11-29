import React from 'react';
import LoginForm from '../loginForm/loginForm';

import './loginPage.scss';

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <div className="login-page-container"> 
                    <LoginForm/>
                </div>
            </div>
        )
    } 
};

export default LoginPage;