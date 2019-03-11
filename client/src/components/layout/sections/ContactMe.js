import React from 'react';
import SectionTitle from './SectionTitle';

const ContactMe = ({ mobile, email, title }) => {
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
};

export default ContactMe;
