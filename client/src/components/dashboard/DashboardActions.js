import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dashboard-action-container text-center '>
      <div className='my-2'>
        <Link to='/edit-profile' className='btn btn-light btn-hover mx-1'>
          <i className='fas fa-user-circle text-info mr-1' /> Edit Profile
        </Link>
        <Link to='/add-edit-portfolio' className='btn btn-light btn-hover mx-1'>
          <i className='fas fa-laptop-code text-info mr-1' /> Add Portfolio
        </Link>
        <Link to='/add-skill' className='btn btn-light btn-hover mx-1'>
          <i className='fas fa-magic text-info mr-1' /> Add Skill
        </Link>
      </div>
      <div className='my-2'>
        <Link
          to='/add-edit-experience'
          className='btn btn-light btn-hover mx-1'>
          <i className='fas fa-magic text-info mr-1' /> Add Experience
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
