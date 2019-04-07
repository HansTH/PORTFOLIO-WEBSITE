import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deletePortfolio,
  getportfolioItem
} from '../../redux/actions/profileActions';

class Portfolio extends Component {
  handleDeletePortfolio = id => {
    this.props.deletePortfolio(id);
  };

  handleEditPortfolio = id => {
    this.props.getportfolioItem(id);
  };

  render() {
    const { portfolio } = this.props;

    const portfolioContent =
      portfolio &&
      portfolio
        .sort((a, b) => (a.appYear < b.appYear ? 1 : -1))
        .map(item => (
          <div key={item._id} className='portfolio-item withBorder-1 my-1'>
            <div className='portfolio-image'>
              <img src={item.appScreenshots[0]} alt={item.appTitle} />
            </div>
            <div className='portfolio-content mx-1'>
              <h4 className='text-primary display-1'>{item.appTitle}</h4>
              <p className='text-color my-0'>{item.appInfo}</p>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <h4 className='text-primary display-1'>Category </h4>
                <p className='text-color'>&nbsp;- {item.appCategory}</p>
              </div>
              <h4 className='text-primary display-1 '>Skills</h4>
              <p className='text-color my-0'>{item.appSkills.join(' • ')}</p>
              <div className='my-1' style={{ display: 'flex' }}>
                <Link
                  to={'/add-edit-portfolio'}
                  className='btn-light btn-small'
                  onClick={() => this.handleEditPortfolio(item._id)}>
                  Edit
                </Link>
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
        <h4 className='text-center text-color display-2'>Portfolio</h4>
        <div className=''>
          {portfolioContent && portfolioContent.length === 0 ? (
            <p className='text-color text-center display-1'>
              Add your best work.
            </p>
          ) : (
            portfolioContent
          )}
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.array.isRequired,
  getportfolioItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePortfolio, getportfolioItem }
)(Portfolio);
