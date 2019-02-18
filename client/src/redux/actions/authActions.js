import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { jwt_decode } from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login and get user Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(res => {
      // save token in local storage
      const { token } = res.data;
      let localStorage = Storage;
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // decode token
      const decoded = jwt_decode(token);
      // set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
