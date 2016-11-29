import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'; 
import reducer from './reducers/commonReducer';

import App from "./containers/app";

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';

import jwt from 'jsonwebtoken';
// import WelcomePage from "./components/welcomePage/welcomePage.js";
// import LoginPage from "./components/loginPage/loginPage.js";
// import SignUpPage from "./components/signUpPage/signUpPage.js";
// import TransactionsPage from "./components/transactionsPage/transactionsPage.js";
// import DashboardPage from "./components/dashboardPage/dashboardPage.js";
// import NotFound from './components/common/notFound.js';

// import configureStore from './store/configureStore';


// import logger from 'redux-logger'
// import { syncHistoryWithStore } from 'react-router-redux'

// import reducer from './reducers/commonReducer'

 import 'jquery';
// import 'font-awesome/css/font-awesome.min.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.min.js';

// const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);
// const rootUrl = '/';

// render(
// 	(<Provider store={store}>
// 		<Router history={history}>
// 			<Route path="/" component={App}>
// 				<IndexRoute         component={WelcomePage} />
//                 <Route path="login" component={LoginPage} />
// 				<Route path="signup" component={SignUpPage} />
// 				<Route path="dashboard" component={DashboardPage}>
					
// 				</Route>
// 				<Route path="dashboard/transactions" component={TransactionsPage} />
// 				<Route path="*"     component={NotFound}>
// 					<IndexRedirect from="*" to="/" />
// 				</Route>
// 			</Route>
// 		</Router>
// 	</Provider>)
// 	, document.getElementById('root'));

import routes from './routes';

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>        
, document.getElementById('app'));