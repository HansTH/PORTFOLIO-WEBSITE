import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/actions/authActions';
import { clearProfile } from '../../redux/actions/profileActions';
import '../../utils/js/scripts';

// Redux
import { connect } from 'react-redux';

class Navbar extends Component {
	state = {
		toggle: true
	};
	logoutUser = e => {
		e.preventDefault();
		this.props.clearProfile();
		this.props.logoutUser(this.props.history);
	};

	toggleMenubar = () => {
		this.setState({ toggle: !this.state.toggle });
	};
	render() {
		const { isAuthenticated } = this.props.auth;

		const authLinks = (
			<ul>
				<li>
					<Link to={'/dashboard'} className='text-color btn-hover'>
						Dashboard
					</Link>
				</li>
				<li>
					<Link
						to={'/'}
						className='text-color btn-hover'
						onClick={this.logoutUser}
						style={{ cursor: 'pointer' }}
					>
						Logout
					</Link>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul>
				<li>
					<a
						onClick={this.toggleMenubar}
						className='text-color btn-hover'
						href='/#about'
					>
						Over mij
					</a>
				</li>
				<li>
					<a
						onClick={this.toggleMenubar}
						className='text-color btn-hover'
						href='/#work'
					>
						Portfolio
					</a>
				</li>
				<li>
					<a
						onClick={this.toggleMenubar}
						className='text-color btn-hover'
						href='/#skills'
					>
						skills
					</a>
				</li>
				<li>
					<a
						onClick={this.toggleMenubar}
						className='text-color btn-hover'
						href='/#contact'
					>
						Hallo
					</a>
				</li>
				<li>
					<Link to={'/login'} className='text-color btn-hover'>
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav id='nav' className='nav-container nav-container-sticky py-1'>
				<Link to={'/dashboard'} className='logo text-primary display-1 mx-2'>
					Hans ter Horst
				</Link>
				<div className='navbar mx-2'>
					<a href='#home' id='menu' className='' onClick={this.toggleMenubar}>
						<div className='menubar' />
						<div className='menubar' />
						<div className='menubar' />
					</a>
					<div className={this.state.toggle ? 'active' : 'navlinks'}>
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	clearProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser, clearProfile }
)(withRouter(Navbar));
