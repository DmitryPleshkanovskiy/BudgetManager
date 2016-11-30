import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';

import './navigationBar.scss';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault;
        this.props.logout();
    }

    render() { 
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <div>
            <ul className="nav navbar-nav">
                <li className="active"><Link to="/dashboard"><i className="fa fa-bar-chart" aria-hidden="true"></i> Dashboard <span className="sr-only">(current)</span></Link></li>
                {/*<li><a href="#"><i className="fa fa-exchange fa-rotate-90" aria-hidden="true"></i> Transactions</a></li>*/}
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.auth.user.email} <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    {/*<li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li role="separator" className="divider"></li>*/}
                    <li><a href="" onClick={this.logout}>Logout</a></li>
                </ul>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                
            </ul>
            </div>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <i className="fa fa-usd" aria-hidden="true"></i>
                        </a>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">Budget manager</Link>
                    </div>

                    <div className="collapse navbar-collapse"  id="bs-example-navbar-collapse-1">
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        )
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { logout })(NavigationBar);