import React from 'react';
import SectionTitle from './SectionTitle';

const Skill = ({ skill }) => {
  return (
    <div className='container '>
      <SectionTitle title='Skills' subtitle='wat kan ik' />
      <div className='skill-container '>
        {skill.map(skill => (
          <div key={skill.title} className='skill-item text-center'>
            <img
              src={skill.icon}
              alt={skill.title}
              style={{ width: 120 }}
              className='my-1'
            />
            <h1 className='text-color display-2 text-bold'>{skill.title}</h1>
            <ul className=''>
              {skill.skills.map(skill => (
                <li key={skill} className='text-color display-1'>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;