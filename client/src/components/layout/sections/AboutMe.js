import React from 'react';
import SectionTitle from './SectionTitle';

const AboutMe = ({ bio }) => {
  return (
    <div className='container '>
      <SectionTitle title='Over mij' subtitle='wie ben ik' />
      <h1 className='text-center text-color text-regular display-1'>{bio}</h1>
    </div>
  );
};

export default AboutMe;
