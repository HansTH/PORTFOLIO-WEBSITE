import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE } from '../actions/types';

// Get profile
export const getUserProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const checkUserProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile/user')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};
