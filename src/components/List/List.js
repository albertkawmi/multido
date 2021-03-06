import React from 'react';
import { dndContainer, dndElement } from 'react-dragula-hoc';
import Item from '../Item';

const Items = ({ children }) =>
  <ul className={
    ['list__items',
      !children.length && 'empty'
    ].filter(Boolean).join(' ')
  }>
    {children}
  </ul>

const DropItems = dndContainer({
  containerType: 'lists',
  acceptType: 'items',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(Items);

const List = ({
  list: { title, id: listId },
  items,
  onItemDrop,
  onItemCreated,
  onListTitleChange
}) => {
  return (
    <div className="list">
      <input
        className="list__title"
        onChange={onListTitleChange}
        value={title}
        placeholder="Untitled List"
      />
      <DropItems id={listId} onChange={onItemDrop} >
        {items.map(
          item => <Item item={item} parent={listId} id={item.id} key={item.id} />
        )}
      </DropItems>
      <button
        className="list__add-item"
        onClick={onItemCreated}>
        + Add an item
      </button>
    </div>
  );
}

const DraggableList = dndElement({
  type: 'lists',
})(List);

export default DraggableList;
