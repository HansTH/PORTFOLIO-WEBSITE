import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions/profileActions';
import AboutMe from './sections/AboutMe';
import Skill from './sections/Skill';
import ContactMe from './sections/ContactMe';
import Portfolio from './sections/Portfolio';

// Redux
import { connect } from 'react-redux';

class Showcase extends Component {
  componentDidMount() {
    this.props.getProfile();

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let showcaseContent = {};

    if (profile === null || loading) {
      showcaseContent = <h2>loading...</h2>;
    } else {
      showcaseContent = null;
      if (Object.keys(profile).length > 0) {
        showcaseContent = profile.map(item => (
          <div key={item._id}>
            <AboutMe bio={item.bio} />
            <Portfolio portfolio={item.portfolio} />
            <Skill skill={item.skill} />
            <ContactMe
              mobile={item.contactNumber}
              email={item.contactEmail}
              title={item.contactTitle}
            />
          </div>
        ));
      }
    }

    return (
      <header id='showcase'>
        <div className='container'>{showcaseContent}</div>
      </header>
    );
  }
}

Showcase.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Showcase);
