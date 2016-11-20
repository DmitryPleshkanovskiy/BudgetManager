import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainPage from './mainPage.js';

import * as appActions from '../actions/appActions';

import './app.scss';

class App extends Component {
	constructor(props) {
		super(props);

		this.props.appActions.init();

	}

	render() {
        return (
            <div>
                <MainPage>
                    { this.props.children }
                </MainPage>
            </div>
        )
	 }
}

function mapStateToProps(state) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
	return {
		appActions: bindActionCreators(appActions, dispatch),
	};
}

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
