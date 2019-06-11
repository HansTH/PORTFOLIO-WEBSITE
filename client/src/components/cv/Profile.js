import React from 'react';
import PropTypes from 'prop-types';
import profileImage from '../../img/profileImage.jpg';

export default function Bio({ bio }) {
	return (
		<div id='profile' className='my-1'>
			<div className='profile-container'>
				<div className='profile-image'>
					<img src={profileImage} alt='profile' />
				</div>
				<div className='profile-column'>
					<h1 className='text-primary display-3'>{bio.fullname}</h1>
					<h2 className='text-color display-s'>{bio.jobtitle}</h2>
					<p className='text-color profile-text'>{bio.bio}</p>
				</div>
			</div>
		</div>
	);
}

Bio.propTypes = {
	bio: PropTypes.object.isRequired
};
