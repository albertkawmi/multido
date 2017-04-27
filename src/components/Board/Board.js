import React from 'react';
import { dndContainer } from 'react-dragula-hoc';
import List from '../List';

const ContainerBoard = ({ children }) => <section className="board__items">{children}</section>;

const DndBoard = dndContainer({
  containerType: 'boards',
  acceptType: 'lists',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerBoard);

const Board = ({
  board: { title, id: boardId },
  lists,
  onListDrop,
  onTitleChange,
  onListCreated
}) => {
  return (
    <div className="board">
      <input
        className="board__title"
        value={title}
        onChange={onTitleChange}
        placeholder="(untitled)"
      />
      <DndBoard id={boardId} onChange={onListDrop}>
        {lists.map(
          list => <List list={list} id={list.id} key={list.id} />
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

export default Board;
