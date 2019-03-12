import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearProfile } from './redux/actions/profileActions';

// components
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import Showcase from './components/layout/Showcase';
import AddSkill from './components/skills/AddSkill';
import AddPortfolio from './components/portfolio/AddPortfolio';
import EditSkill from './components/skills/EditSkill';

import './styles.css';

// Check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());

    // redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-skill' component={AddSkill} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-skill' component={EditSkill} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-portfolio'
                  component={AddPortfolio}
                />
              </Switch>
            </div>
            <Route exact path='/' component={Showcase} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
