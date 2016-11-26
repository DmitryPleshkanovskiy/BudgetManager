import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        this.setState({ 
            errors: {},
            isLoading: true
        });
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed up successfully. Welcome!'
                });
                this.context.router.push('/');
                this.setState({isLoading: false});
            },
            (err) => { 
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Something gone wrong.'
                });
                console.log('data:' + err.response.data);
                this.setState({ errors: err.response, isLoading: false })
            }
        );
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        className="form-control" 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email} 
                        onChange={this.onChange}
                    />
                    {errors.email && <span className="help-block">{ errors.email }</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Password:</label>
                    <input 
                        id="pass"
                        className="form-control" 
                        type="password"
                        name="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <span className="help-block">{ errors.password }</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="pass2">Confirm password :</label>
                    <input 
                        id="pass2" 
                        className="form-control" 
                        type="password"
                        name="passwordConfirmation" 
                        placeholder="Confirm password"
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                    />
                    {errors.passwordConfirmation && <span className="help-block">{ errors.passwordConfirmation }</span>}
                </div>
                <button disabled={this.state.isLoading} className="btn btn-success" type="submit">
                Sign Up
                </button> | Already have an account? <Link to="/login">Login</Link>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm;