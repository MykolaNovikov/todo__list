import { createStore } from 'redux';
import reducer from './reducer';

// Create the Redux store by passing the reducer function to createStore
const store = createStore(reducer);

export default store;