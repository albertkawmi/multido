import React from 'react';
import Board from '../Board';

const Space = ({ space, boards, onTitleChange, onBoardCreated }) =>
  <main className="boards">
    <input
      className="space__title"
      value={space.title}
      onChange={onTitleChange}
      placeholder="(untitled)"
    />
    {boards.map(
      board => <Board board={board} id={board.id} key={board.id} />
    )}
    <button
      className="new-board-btn"
      onClick={onBoardCreated}>
      + New Board
    </button>
  </main>

  export default Space;
