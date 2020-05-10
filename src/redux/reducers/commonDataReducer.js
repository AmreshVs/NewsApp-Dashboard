import { USER_LOGIN, SNACKBAR_MESSAGE, TOGGLE_THEME } from '../actionCreators/commonAC';

const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')),
  snackbar: { visible: false, msg: '', status: '' },
  theme: 'light'
};

const CommonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, { userData: action.payload });
    case SNACKBAR_MESSAGE:
      return Object.assign({}, state, { snackbar: action.payload });
    case TOGGLE_THEME:
      return Object.assign({}, state, { theme: action.payload });
    default:
      return state;
  }
};

export default CommonDataReducer;