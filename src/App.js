import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  Home,
  ListSpaces,
  Space
} from './routes';

export default class extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <header>
            <Link className="site-name__link" to="/">
              <h1 className="site-name__text">multi.do</h1>
            </Link>
            <div className="login-links">
              Sign In | Join
            </div>
          </header>

          <Route exact path="/" component={Home}/>
          <Route exact path="/spaces" component={ListSpaces}/>
          <Route path="/spaces/:id" component={Space}/>

          <footer>Made with ❤️ in sunny Glasgow</footer>
        </div>
      </Router>
    );
  }
}