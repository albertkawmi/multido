import React, { Component } from 'react';
import initialState from '../../data/sample.json';
import bindActions from '../actions';
import { context } from '../config';
import Board from './Board';

export default class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.actions = bindActions(this);
  }
  getChildContext() {
    return {
      actions: this.actions,
    };
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }
  render() {
    const { boards } = this.state;
    return (
      <main className="boards">
        {Object.keys(boards).map(
          boardId => <Board {...boards[boardId]} key={boardId} />
        )}
        <button
          className="new-board-btn"
          onClick={this.actions.addNewBoard}>
          + New Board
        </button>
      </main>
    );
  }
}

Boards.childContextTypes = context;
