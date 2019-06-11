import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function Experience({ experience }) {
	const experienceContent = experience
		.sort((a, b) => (a.companyStart < b.companyStart ? 1 : -1))
		.map(exp => {
			let jobInfo = exp.companyJobInfo.split('-');
			let postitionInfo = (
				<div>
					<div className='text-bold'>{exp.companyJobTitle}</div>
					<div>
						{jobInfo.map((item, index) => (
							<li key={index}>{`${item}`}</li>
						))}
					</div>
				</div>
			);
			return (
				<tr key={exp._id}>
					<td>{exp.companyName}</td>
					<td>{postitionInfo}</td>
					<td>
						<Moment format='YYYY'>{exp.companyStart}</Moment> -{' '}
						{exp.companyCurrent ? (
							' NU'
						) : (
							<Moment format='YYYY'>{exp.companyEnd}</Moment>
						)}
					</td>
				</tr>
			);
		});
	return (
		<div id='experience' className='my-1'>
			<h1 className='display-2 text-primary'>Experience</h1>
			<div className='seperator-line' />
			<table className='table text-color'>
				<thead>
					<tr className='text-bold text-uppercase'>
						<th>Bedrijf</th>
						<th>Postitie</th>
						<th style={{ width: '21%' }}>Jaar</th>
					</tr>
				</thead>
				<tbody>{experienceContent}</tbody>
			</table>
		</div>
	);
}

Experience.propTypes = {
	experience: PropTypes.array.isRequired
};
