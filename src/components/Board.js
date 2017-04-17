import React from 'react';
import { dndContainer } from '../dragDrop';
import { context } from '../config';
import DraggableList from './DraggableList';

const ContainerBoard = ({ children }) => <section className="board__items">{children}</section>;

const DndBoard = dndContainer({
  containerType: 'board',
  acceptType: 'list',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerBoard);

const Board = ({ title, lists: listIds, id: boardId }, { actions }) => {
  const state = actions.getState();
  const onListDrop = actions.handleDrop('boards', 'lists');
  const lists = listIds.map(listId => state.lists[listId]);
  return (
    <div className="board">
      <input
        className="board__title"
        value={title}
        onChange={ev => actions.update.boards(boardId, {
          title: ev.target.value
        })}
        placeholder="(untitled)"
      />
      <DndBoard id={boardId} onDrop={onListDrop}>
        {lists.map(
          list => <DraggableList {...list} key={list.id} />
        )}
      </DndBoard>
      <button
        className="board__new-list"
        onClick={() => actions.addListToBoard(boardId)} >
        + New List
      </button>
    </div>
  );
}

Board.contextTypes = context;

export default Board;
