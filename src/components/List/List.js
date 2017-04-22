import React from 'react';
import { dndContainer, dndElement } from '../../dragDrop';
import Item from '../Item';

const Items = ({ children }) => <ul className="list__items">{children}</ul>;

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
        placeholder="(untitled)"
      />
      <DropItems id={listId} onDrop={onItemDrop} >
        {items.map(
          item => <Item item={item} id={item.id} key={item.id} />
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
