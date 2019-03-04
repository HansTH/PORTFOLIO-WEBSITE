import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileActions';
import AboutMe from './sections/AboutMe';
// Redux
import { connect } from 'react-redux';
import ContactMe from './sections/ContactMe';

class Showcase extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let showcaseContent = {};

    if (profile === null || loading) {
      showcaseContent = <h2>loading...</h2>;
    } else {
      if (Object.keys(profile).length > 0 && profile[0]) {
        showcaseContent = profile.map(item => (
          <div key={item._id}>
            <AboutMe bio={item.bio} />
            <ContactMe mobile={item.mobile} email={item.user._id} />
          </div>
        ));
      }
    }

    return (
      <header id='showcase'>
        <div className='showcase-container'>{showcaseContent}</div>
      </header>
    );
  }
}

Showcase.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Showcase);
