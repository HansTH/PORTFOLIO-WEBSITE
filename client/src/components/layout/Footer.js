import React from 'react';

export default function Footer() {
	return (
		<footer id='footer' className='bg-dark text-center display-1 py-2'>
			<div className='container'>
				<p>Hans ter Horst | {new Date().getFullYear()}</p>
			</div>
		</footer>
	);
}
