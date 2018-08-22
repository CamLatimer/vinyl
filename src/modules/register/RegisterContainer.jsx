import React from 'react';
import {connect} from 'react-redux';

import Register from './Register.jsx';
import * as actions from '../auth/state';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => {
	/**
	 * @param {RegisterDTO} registerDto
	 */
	const submitRegister = registerDto => {
		dispatch(actions.register(registerDto));
	};

	return {submitRegister};
};

const RegisterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

export default RegisterContainer;
