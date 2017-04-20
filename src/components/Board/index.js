import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import { createList, updateBoard } from '../../actions/crud';
import { handleListDrop } from '../../actions/dragDrop';

const BoardContainer = ({ handleListDrop, updateBoard, createList, ...board }) =>
  <Board {...board}
    onTitleChange={ev => updateBoard({
      ...board,
      title: ev.target.value
    })}
    onListCreated={() => createList(board.id)}
    onListDrop={handleListDrop}
  />

const mapDispatchToProps = {
  handleListDrop,
  updateBoard,
  createList
};

export default connect(null, mapDispatchToProps)(BoardContainer);
