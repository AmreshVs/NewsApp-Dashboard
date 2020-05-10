import { USER_LOGIN, SNACKBAR_MESSAGE, TOGGLE_THEME } from '../actionCreators/commonAC';

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload
  };
};

export const snackMessage = (payload) => {
  return {
    type: SNACKBAR_MESSAGE,
    payload
  };
};

export const toggleTheme = (payload) => {
  return {
    type: TOGGLE_THEME,
    payload
  }
} 