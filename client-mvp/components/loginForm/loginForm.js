import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import { Link } from 'react-router';

import validateInput from './validation'; 

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors: errors });
        }

        return isValid;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state)
                .then(
                    (res) => this.context.router.push('/dashboard'))
                .catch(
                    (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                );
            
        }
    }

    render() {
        const { errors, email, password, isLoading } = this.state;
        return (
            <div className="loginForm">
                <div className="formHeader">
                    <h2>Login</h2>
                </div>                
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            id="email" 
                            className="form-control" 
                            name="email" 
                            type="email" 
                            placeholder="Email"
                            value={this.state.email} 
                            onChange={this.onChange}/>
                    </div>
                    {errors.email && <span className="help-block alert-danger">{ errors.email }</span>}
                    <div className="form-group">
                        <label htmlFor="pass">Password:</label>
                        <input 
                            id="pass" 
                            className="form-control" 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            value={this.state.password} 
                            onChange={this.onChange}/>
                    </div>
                    {errors.password && <span className="help-block alert-danger">{ errors.password }</span>}
                    {errors.form && <div className="alert alert-danger">{ errors.form }</div>}
                    <button disabled={isLoading} id="submit" className="btn btn-primary" type="submit">
                        {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>} Login</button> | Need an account? <Link to="/signup">Sign up</Link>
                </form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);