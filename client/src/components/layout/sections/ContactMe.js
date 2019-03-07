import React from 'react';
import SectionTitle from './SectionTitle';

const ContactMe = ({ mobile, email, title }) => {
  return (
    <div className='my-4'>
      <SectionTitle title='Contact' subtitle='Hallo' />
      <p className='text-color text-light text-center display-2 my-2'>
        {title}
      </p>
      <div className='text-center'>
        <a className='text-color text-bold display-2' href={`mailto:${email}`}>
          {email}
        </a>
        <h1 className='text-primary text-bold display-2'>{mobile}</h1>
      </div>
    </div>
  );
};

export default ContactMe;
