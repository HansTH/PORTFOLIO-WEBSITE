import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from './SectionTitle';

export default function AboutMe({ bio }) {
	return (
		<div id='about' className='container my-4'>
			<SectionTitle title='Over mij' subtitle='wie ben ik' />
			{bio ? (
				<p className='text-center text-color text-regular display-1'>{bio}</p>
			) : (
				<p className='text-color text-center display-1'>Tell us a about you.</p>
			)}
		</div>
	);
}

AboutMe.propTypes = {
	bio: PropTypes.string.isRequired
};
