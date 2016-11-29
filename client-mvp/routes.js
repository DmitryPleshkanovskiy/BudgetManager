import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import WelcomePage from './components/welcomePage/welcomePage';
import SignupPage from './components/signupPage/signupPage';
import LoginPage from './components/LoginPage/loginPage';
import Dashboard from './components/dashboardPage/dashboardPage';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={WelcomePage} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
        <Route path="dashboard" component={Dashboard} />
    </Route>
)