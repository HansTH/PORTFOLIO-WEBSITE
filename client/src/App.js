import React, { Component } from 'react';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
