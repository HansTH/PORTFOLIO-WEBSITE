import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from './SectionTitle';

export default function Skill({ skill }) {
	const skillContent = (
		<div className='skill-container '>
			{skill.map(skill => (
				<div key={skill.title} className='skill-item text-center'>
					<img src={skill.icon} alt={skill.title} className='my-1' />
					<h1 className='text-color lead text-bold'>{skill.title}</h1>
					<ul className=''>
						{skill.skills.map(skill => (
							<li key={skill} className='text-color display-1'>
								{skill}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);

	return (
		<div id='skills' className='container '>
			<SectionTitle title='Skills' subtitle='wat kan ik' />
			{skill.length !== 0 ? (
				skillContent
			) : (
				<p className='text-color text-center display-1'>
					Add your developer or programming skills.
				</p>
			)}
		</div>
	);
}

Skill.propTypes = {
	skill: PropTypes.array.isRequired
};
