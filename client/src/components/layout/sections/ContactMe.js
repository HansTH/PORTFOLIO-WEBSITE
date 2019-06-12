import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from './SectionTitle';

export default function ContactMe({ contact }) {
	const { mobile, email, title } = contact;
	return (
		<div id='contact' className='my-4 text-center'>
			<SectionTitle title='Contact' subtitle='Hallo' />
			<p className='text-color text-light text-center display-2 my-2'>
				{title}
			</p>
			<div className='text-center'>
				<a className='text-color text-bold display-2' href={`mailto:${email}`}>
					{email}
				</a>
			</div>
			<div>
				<a className='text-primary text-bold display-2' href={`tel:${mobile}`}>
					{mobile}
				</a>
			</div>
		</div>
	);
}

ContactMe.propTypes = {
	contact: PropTypes.object.isRequired
};
