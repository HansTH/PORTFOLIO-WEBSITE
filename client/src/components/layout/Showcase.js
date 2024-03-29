import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileActions';
import AboutMe from './sections/AboutMe';
import Skill from './sections/Skill';
import ContactMe from './sections/ContactMe';
import Portfolio from './sections/Portfolio';
import Loading from '../common/Loading';

// Redux
import { connect } from 'react-redux';

class Showcase extends Component {
	componentDidMount() {
		this.props.getProfile();

		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		const { profile, loading } = this.props.profile;

		let showcaseContent = {};

		if (profile === null || loading) {
			showcaseContent = <Loading />;
		} else {
			showcaseContent = null;
			if (profile.length > 0) {
				showcaseContent = profile.map(item => {
					const contact = {
						mobile: item.contactNumber,
						email: item.contactEmail,
						title: item.contactTitle
					};
					return (
						<div key={item._id}>
							<AboutMe bio={item.bio} />
							<Portfolio portfolio={item.portfolio} />
							<Skill skill={item.skill} />
							<ContactMe contact={contact} />
						</div>
					);
				});
			}
		}

		return (
			<header id='showcase'>
				<div className='container'>{showcaseContent}</div>
			</header>
		);
	}
}

Showcase.propTypes = {
	profile: PropTypes.object,
	getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfile }
)(Showcase);
