import React from 'react';
import './loginPage.scss';

const LoginPage = (props) => {
	return (
        <div>
            <div className="login-page-container"> 
                <div className="loginForm">
                    <div className="formHeader">
                        <h2>Login</h2>
                    </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" className="form-control" type="email" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">Password:</label>
                                    <input id="pass" className="form-control" type="password" placeholder="Password"/>
                                </div>
                                <button id="submit" className="btn btn-primary" type="submit">Login</button> | Need an account? <a href="/signup">Sign up</a>
                            </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;