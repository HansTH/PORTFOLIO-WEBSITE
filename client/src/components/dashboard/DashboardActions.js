import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='text-center my-1'>
      <Link to='/edit-profile' className='btn btn-light btn-hover mx-1'>
        <i className='fas fa-user-circle text-info mr-1' /> Edit Profile
      </Link>
      <Link to='/add-portfolio' className='btn btn-light btn-hover mx-1'>
        <i className='fab fa-black-tie text-info mr-1' /> Add Portfolio
      </Link>
      <Link to='/add-skills' className='btn btn-light btn-hover mx-1'>
        <i className='fas fa-graduation-cap text-info mr-1' /> Add Skills
      </Link>
    </div>
  );
};

export default DashboardActions;
