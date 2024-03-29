import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ITEM
} from '../actions/types';

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

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
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

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

// Delete account & profile
export const deleteAccount = history => dispatch => {
  if (window.confirm('Are you sure to delete your account!')) {
    axios
      .delete('/api/profile')
      .then(
        res => history.push('/'),
        dispatch({
          type: SET_CURRENT_USER,
          payload: null
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Edit skill
export const addEditSkill = (skillData, history) => dispatch => {
  axios
    .post('/api/profile/skill/', skillData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add skill
export const addSkill = (skillData, history) => dispatch => {
  axios
    .post('/api/profile/skill', skillData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete skill
export const deleteSkill = id => dispatch => {
  axios
    .delete(`/api/profile/skill/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get skill
export const getSkill = id => dispatch => {
  axios
    .get(`/api/profile/skill/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// PORTFOLIO
//
// Add or Edit Porfolio
export const addEditPortfolio = (portfolioData, history) => dispatch => {
  axios
    .post('/api/profile/portfolio/', portfolioData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete portfolio
export const deletePortfolio = id => dispatch => {
  axios
    .delete(`/api/profile/portfolio/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get portfolio
export const getportfolioItem = id => dispatch => {
  axios
    .get(`/api/profile/portfolio/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// EXPERIENCE
//
// Add or Edit experience
export const createEditExperience = (experienceData, history) => dispatch => {
  axios
    .post('/api/profile/experience/', experienceData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get experience by id.
// Get portfolio
export const getExperienceItem = id => dispatch => {
  axios
    .get(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// EDUCATION
//
// Add or Edit education
export const createEditEducation = (educationData, history) => dispatch => {
  axios
    .post('/api/profile/education/', educationData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get education by id.
// Get portfolio
export const getEducationItem = id => dispatch => {
  axios
    .get(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
