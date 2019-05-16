import axios from 'axios';
import { returnErrors } from './errorActions';
import {
AUTH_ERROR,
  // LOGIN_FAIL,
  // LOGIN_SUCCESS,
  // LOGOUT_SUCCESS,
  // REGISTER_FAIL,
  // REGISTER_SUCCESS,
  USER_LOADED, USER_LOADING
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Setup config/headers & token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};