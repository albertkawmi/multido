import React, { Component } from 'react';
import initialState from '../../data/sample.json';
import bindActions from '../actions';
import Board from './Board';

export default const Space = ({ boards, onBoardCreated }) =>
  <main className="boards">
    {Object.keys(boards).map(
      boardId => <Board {...boards[boardId]} key={boardId} />
    )}
    <button
      className="new-board-btn"
      onClick={onBoardCreated}>
      + New Board
    </button>
  </main>
