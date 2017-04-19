import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Test';
import './index.css';
import '../node_modules/react-dragula/dist/dragula.css';
import sampleData from '../data/sample.json';

// Redux dependencies
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';

// adds .no-touch class to body to avoid :hover issues on touch devices
import { noTouch } from './utils';
noTouch();

// Pre-load state
const preloadedState = sampleData;

// Redux setup reducer, store and render Provider
const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
