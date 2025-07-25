import {
  SET_LOGIN_DATA,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';
import api from '../utils/api';
import { setAlert } from './alert';

// Login User
export const setLoginData = (data) => async (dispatch) => {
  dispatch({
    type: SET_LOGIN_DATA,
    payload: data
  });
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};


// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};