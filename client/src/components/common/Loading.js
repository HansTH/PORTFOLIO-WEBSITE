import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  state = {
    text: this.props.text
  };

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({
            text: text
          }))
        : this.setState(prevState => ({
            text: prevState.text + '.'
          }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <h2 className='text-color text-center my-2'>{this.state.text}</h2>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 400
};

export default Loading;
