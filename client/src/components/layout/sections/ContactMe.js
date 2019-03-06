import React from 'react';
import SectionTitle from './SectionTitle';

const ContactMe = ({ mobile, email }) => {
  return (
    <div className='my-4'>
      <SectionTitle title='Contact' subtitle='Hallo' />
      <p className='text-color text-light text-center display-2 my-2'>
        Als je enthousiast bent geworden, neem dan contact op.
      </p>
      <a
        className='text-center text-color text-bold display-2'
        href={`mailto:${email}`}>
        {email}
      </a>
      <h1 className='text-center text-color text-bold display-2'>{email}</h1>
      <h1 className='text-center text-primary text-bold display-2'>{mobile}</h1>
    </div>
  );
};

export default ContactMe;
