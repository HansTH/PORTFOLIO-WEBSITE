import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePortfolio } from '../../redux/actions/profileActions';

class Portfolio extends Component {
  handleDeletePortfolio = id => {
    this.props.deletePortfolio(id);
  };

  handleEditPortfolio = id => {
    console.log(id);
  };

  render() {
    const { portfolio } = this.props;

    const portfolioContent =
      portfolio &&
      portfolio.map(item => (
        <div key={item._id} className=' portfolio-item'>
          <div className='portfolio-image mx-1'>
            <img src={item.appScreenshot} alt={item.appTitle} />
          </div>
          <div className='portfolio-content mx-1'>
            <h4 className='text-primary display-1'>{item.appTitle}</h4>
            <p className='text-color my-0'>{item.appInfo}</p>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <h4 className='text-primary display-1'>Year </h4>
              <p>&nbsp;{item.appYear}</p>
            </div>
            <h4 className='text-primary display-1 '>Skills</h4>
            <p className='text-color my-0'>{item.appSkills.join(' • ')}</p>
            <div className='my-1' style={{ display: 'flex' }}>
              <button
                type='button'
                className='btn-light btn-small'
                onClick={() => this.handleEditPortfolio(item._id)}>
                Edit
              </button>
              <button
                type='button'
                className='btn-primary btn-small mx-1'
                onClick={() => this.handleDeletePortfolio(item._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ));

    return (
      <div className='my-4'>
        <h4 className='my-1 text-center text-color display-2'>Portfolio</h4>
        <div className='skill-container'>
          {portfolioContent && portfolioContent.length === 0 ? (
            <p className='text-color display-1'>Please add your best work.</p>
          ) : (
            portfolioContent
          )}
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.array.isRequired
};

export default connect(
  null,
  { deletePortfolio }
)(Portfolio);
