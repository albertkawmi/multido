import React from 'react';
import { connect } from 'react-redux';
import { dndContainer, dndElement } from '../dragDrop';
import DraggableItem from './DraggableItem';
import actions from '../actions/lists';
import { createDropHandler } from '../actions/dragDrop';

const Items = ({ children }) => <ul className="list__items">{children}</ul>;

const DropItems = dndContainer({
  containerType: 'list',
  acceptType: 'item',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(Items);

const List = ({
  id: listId,
  title,
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
          item => item && <DraggableItem {...item} key={item.id} />
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
  type: 'list',
})(List);

const ConnectedDraggableList = props => {
  const { updateList, ...otherProps } = props;
  const handlers = {
    onListTitleChange: ev => updateList({
      ...props,
      title: ev.target.value
    }),
    onItemCreated: () => updateList({})
  }
  return <DraggableList {...otherProps} {...handlers} />;
};

const mapStateToProps = (state, ownProps) => ({
  items: ownProps.items.map(itemId => state.items[itemId])
});

const mapDispatchToProps = {
  onItemDrop: createDropHandler('lists', 'items'),
  updateList: actions.updateSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDraggableList);
