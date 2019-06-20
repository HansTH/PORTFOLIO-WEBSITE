import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profileActions';
import Loading from '../common/Loading';
import Profile from './Profile';
import Contact from './Contact';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';

class CV extends Component {
	componentDidMount() {
		this.props.getProfile();
	}

	render() {
		const { profile, loading } = this.props.profile;

		let cvContent = {};
		if (profile === null || loading) {
			cvContent = <Loading />;
		} else {
			if (profile.length > 0) {
				cvContent = profile.map((item, index) => {
					const profile = {
						bio: item.bio,
						fullname: item.fullname,
						jobtitle: item.jobtitle
					};
					const contact = {
						website: item.website,
						email: item.contactEmail,
						mobile: item.contactNumber,
						github: item.github
					};
					return (
						<div key={index}>
							<Profile bio={profile} />
							<Contact contact={contact} />
							<div className='row'>
								<div className='column'>
									<Experience experience={item.experience} />
								</div>
								<div className='column'>
									<Education education={item.education} />
									<Skills skills={item.skill} />
								</div>
							</div>
						</div>
					);
				});
			} else {
				cvContent = null;
			}
		}

		return <div>{cvContent}</div>;
	}
}

CV.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfile }
)(CV);
