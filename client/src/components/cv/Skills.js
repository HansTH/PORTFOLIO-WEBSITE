import React from 'react';
import PropTypes from 'prop-types';

export default function Skills({ skills }) {
	return (
		<div>
			<h1 className='display-2 text-primary'>Skills</h1>
			<div className='seperator-line' />
			<ul className='my-1 skills'>
				{skills.map(skill => (
					<div key={skill._id} className='skill'>
						<img src={skill.icon} alt={skill.title} />
						<h1 className='text-primary display-1'>{skill.title}</h1>
						{skill.skills.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</div>
				))}
			</ul>
		</div>
	);
}

Skills.propTypes = {
	skills: PropTypes.array.isRequired
};
