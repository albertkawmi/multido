import React from 'react';
import { dndContainer } from 'react-dragula-hoc';
import List from '../List';

const ContainerRow = ({ children }) => <section className="row__items">{children}</section>;

const DndRow = dndContainer({
  containerType: 'rows',
  acceptType: 'lists',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerRow);

const Row = ({
  row: { id: rowId, title },
  lists,
  onListDrop,
  onTitleChange,
  onListCreated
}) => {
  return (
    <div className="row">
      <input
        className="row__title"
        value={title}
        onChange={onTitleChange}
        placeholder="Untitled Row"
      />
      <DndRow id={rowId} onChange={onListDrop}>
        {lists.map(
          list => <List list={list} id={list.id} key={list.id} />
        )}
      </DndRow>
      <button
        className="row__new-list"
        onClick={onListCreated} >
        + New List
      </button>
    </div>
  );
}

export default Row;
