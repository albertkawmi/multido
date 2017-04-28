import React from 'react';
import Board from '../../components/Board';

const Space = (props) =>
  <main className="space">
    <SpaceInfo {...props} />
    <Boards {...props} />
  </main>

const SpaceInfo = ({ space, onTitleChange }) =>
  <div className="space__info">
    <input
      className="space__title"
      value={space.title}
      onChange={onTitleChange}
      placeholder="(untitled)"
    />
  </div>

const Boards = ({ boards, onBoardCreated }) =>
  <div className="boards">
    {boards.map(
      board => <Board board={board} id={board.id} key={board.id} />
    )}
    <button
      className="new-board-btn"
      onClick={onBoardCreated}>
      + New Board
    </button>
  </div>

export default Space;
