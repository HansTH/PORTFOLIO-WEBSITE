import React from 'react';
import SectionTitle from './SectionTitle';

const ContactMe = ({ mobile, email }) => {
  return (
    <div className='container '>
      <SectionTitle title='Contact' subtitle='Hallo' />
      <h1 className='text-center text-color text-regular display-1'>{email}</h1>
      <h1 className='text-center text-color text-regular display-1'>
        {mobile}
      </h1>
    </div>
  );
};

export default ContactMe;
