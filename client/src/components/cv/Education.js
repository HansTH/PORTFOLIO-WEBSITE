import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function Education({ education }) {
	const educationContent = education
		.sort((a, b) => (a.eduStart < b.eduStart ? 1 : -1))
		.map(edu => (
			<tr key={edu._id}>
				<td>{edu.eduSchool}</td>
				<td>{edu.eduTitle}</td>
				<td>
					<Moment format='YYYY'>{edu.eduEnd}</Moment>
				</td>
			</tr>
		));

	return (
		<div id='education' className='my-1'>
			<h1 className='display-2 text-primary'>Education</h1>
			<div className='seperator-line' />
			<table className='table text-color'>
				<thead>
					<tr className='text-bold text-uppercase'>
						<th>School</th>
						<th>Opleiding</th>
						<th>Jaar</th>
					</tr>
				</thead>
				<tbody>{educationContent}</tbody>
			</table>
		</div>
	);
}

Education.propTypes = {
	education: PropTypes.array.isRequired
};
