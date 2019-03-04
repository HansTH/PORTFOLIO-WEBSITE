import React from 'react';
import SectionTitle from './SectionTitle';
import { link } from 'fs';

const Skills = ({ skills }) => {
  return (
    <div className='container '>
      <SectionTitle title='Skills' subtitle='wat kan ik' />
      {skills.map(skill => (
        <div className='skill-item text-center'>
          <img src={skill.icon} style={{ width: 120 }} className='my-1' />
          <h1 className='text-color display-2 text-bold'>{skill.title}</h1>
          <ul className=''>
            {skill.skills.map(skill => (
              <li className='text-color display-1'>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skills;
