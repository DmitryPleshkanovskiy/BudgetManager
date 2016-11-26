import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessagesActions'

import SignUpForm from '../signUpForm/signUpForm';

import './signUpPage.scss';

class SignupPage extends React.Component {

	render () {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
            <div className="container-fluid">
                <div className="signup-page-container"> 
                    <div className="signupForm">
                        <div className="formHeader">
                            <h2>SignUp</h2>
                        </div>
                        <SignUpForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
                    </div>
                </div>
            </div>
        )
    }
};

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);