import { combineReducers } from 'redux';
import CommonDataReducer from './commonDataReducer';

const rootReducer = combineReducers({
  common: CommonDataReducer,
});

export default rootReducer;