import React from 'react';
import Moment from 'react-moment';

function Experience({ experience }) {
	const experienceContent = experience
		.sort((a, b) => (a.companyStart < b.companyStart ? 1 : -1))
		.map(exp => {
			let jobInfo = exp.companyJobInfo.split('-');
			let postitionInfo = (
				<div>
					<div className='text-bold'>{exp.companyJobTitle}</div>
					<div>
						{/* {jobInfo} */}
						{jobInfo.map(item => (
							<li>{`${item}`}</li>
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

export default Experience;
