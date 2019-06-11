import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer id='footer' className='bg-dark text-center display-1 py-2'>
				<div className='container'>
					<p>Hans ter Horst | {new Date().getFullYear()}</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
