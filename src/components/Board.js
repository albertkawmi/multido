import React from 'react';
import { connect } from 'react-redux';
import { dndContainer } from '../dragDrop';
import List from './List';
import { createDropHandler } from '../actions/dragDrop';

const ContainerBoard = ({ children }) => <section className="board__items">{children}</section>;

const DndBoard = dndContainer({
  containerType: 'boards',
  acceptType: 'lists',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerBoard);

const Board = ({ title, lists, id: boardId, onListDrop, onTitleChange, onListCreated }) => {
  return (
    <div className="board">
      <input
        className="board__title"
        value={title}
        onChange={onTitleChange}
        placeholder="(untitled)"
      />
      <DndBoard id={boardId} onDrop={onListDrop}>
        {lists.map(
          list => <List {...list} key={list.id} />
        )}
      </DndBoard>
      <button
        className="board__new-list"
        onClick={onListCreated} >
        + New List
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  onListDrop: createDropHandler('boards', 'lists'),
  onTitleChange: () => {},
  onListCreated: () => {}
};

export default connect(null, mapDispatchToProps)(Board);