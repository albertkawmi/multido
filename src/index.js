import React from 'react';
import ReactDOM from 'react-dom';
import Boards from './components/Boards';
import './index.css';
import '../node_modules/react-dragula/dist/dragula.css';

// Redux dependencies
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

// adds .no-touch class to body to avoid :hover issues on touch devices
import { noTouch } from './utils';
noTouch();

// Redux setup reducer, store and render Provider
const rootReducer = combineReducers({
    entities: reducers.entitiesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
  <Provider store={store}>
    <Boards />
  </Provider>,
  document.getElementById('root')
);
