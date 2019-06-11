import React from 'react';
import PropTypes from 'prop-types';
import emailIcon from '../../img/email-icon.png';
import websiteIcon from '../../img/website-icon.png';
import mobileIcon from '../../img/mobile-icon.png';
import githubIcon from '../../img/github-icon.png';

export default function Contact({ contact }) {
	return (
		<div id='contact' className='my-1'>
			<h1 className='display-2 text-primary'>Contact</h1>
			<div className='seperator-line' />
			<div className='contacts'>
				<div className='column'>
					<a href={contact.website}>
						<img src={websiteIcon} alt='website' />
					</a>
					<h3 className='text-primary'>Website</h3>
				</div>
				<div className='column'>
					<a href={`mailto:${contact.email}`}>
						<img src={emailIcon} alt='email' />
					</a>
					<h3 className='text-primary'>Email</h3>
				</div>
				<div className='column'>
					<a href={`tel:${contact.mobile}`}>
						<img src={mobileIcon} alt='mobile' />
					</a>
					<h3 className='text-primary'>Mobiel</h3>
				</div>
				<div className='column'>
					<a href={contact.github}>
						<img src={githubIcon} alt='github' />
					</a>
					<h3 className='text-primary'>GitHub</h3>
				</div>
			</div>
		</div>
	);
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
};
