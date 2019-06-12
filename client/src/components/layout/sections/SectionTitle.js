import React from 'react';
import PropTypes from 'prop-types';

export default function SectionTitle({ title, subtitle }) {
	return (
		<div className='section-container my-4'>
			<div className='section-title'>
				<h1 className='display-2 text-primary text-uppercase text-bold my-1'>
					{title}
				</h1>
			</div>
			<div className='section-subtitle'>
				<p className='display-2 text-color text-lowercase text-light'>
					{subtitle}
				</p>
			</div>
		</div>
	);
}

SectionTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired
};
