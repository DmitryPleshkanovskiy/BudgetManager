import React from 'react';
import './signUpPage.scss';

const SignUpPage = (props) => {
	return (
        <div>
            <div className="signup-page-container"> 
                <div className="signupForm">
                    <div className="formHeader">
                        <h2>SignUp</h2>
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
                            <div className="form-group">
                                <label htmlFor="pass2">Password:</label>
                                <input id="pass2" className="form-control" type="password" placeholder="Password one more time"/>
                            </div>
                            <button id="submit" className="btn btn-success" type="submit">Sign Up</button> | Already have an account? <a href="/login">Login</a>
                        </form>
                </div>
            </div>
        </div>
    )
};

export default SignUpPage;