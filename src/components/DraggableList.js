import React from 'react';
import { dndContainer, dndElement } from '../dragDrop';
import { context } from '../config';
import DraggableItem from './DraggableItem';

const Items = ({ children }) => <ul className="list__items">{children}</ul>;

const DropItems = dndContainer({
  containerType: 'list',
  acceptType: 'item',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(Items);

const List = ({ id: listId, title, items: itemIds }, { actions }) => {
  const state = actions.getState();
  const items = itemIds.map(itemId => state.items[itemId]);
  const onItemDrop = actions.handleDrop('lists', 'items');
  return (
    <div className="list">
      <input
        className="list__title"
        onChange={ev => actions.update.lists(
          listId,
          { title: ev.target.value }
        )}
        value={title}
        placeholder="(untitled)"
      />
      <DropItems id={listId} onDrop={onItemDrop} >
        {items.map(
          item => <DraggableItem {...item} key={item.id} />
        )}
      </DropItems>
      <button
        className="list__add-item"
        onClick={() => actions.addItemToList(listId)}>
        + Add an item
      </button>
    </div>
  );
}

List.contextTypes = context;

const DraggableList = dndElement({
  type: 'list',
})(List);

export default DraggableList;
