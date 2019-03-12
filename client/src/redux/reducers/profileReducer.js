import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_PROFILE,
  GET_ITEM
} from '../actions/types';

const initialState = {
  profile: null,
  loading: false,
  item: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
