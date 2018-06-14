import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/users'
import LoginForm from '../components/LoginForm'
import {Redirect, Link} from 'react-router-dom'
import './Page.css'

class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Login</h1>

				<LoginForm onSubmit={this.handleSubmit} />

                { this.props.error && <span style={{color:'red'}}>{this.props.error}</span> }

                <h2 className='signup-text'> If you do not already have an account, please <Link to="/signup">sign up!</Link></h2>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    	error: state.login.error
	}
}

export default connect(mapStateToProps, {login})(LoginPage)