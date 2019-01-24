import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// Must have a key of 'form' to work with redux form
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
