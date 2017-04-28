import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
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
          <header>multi.do</header>
          <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/spaces" component={ListSpaces}/>
            <Route path="/spaces/:id" component={Space}/>
          </main>
          <footer>Made with ❤️ in sunny Glasgow</footer>
        </div>
      </Router>
    );
  }
}