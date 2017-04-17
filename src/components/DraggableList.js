import React from 'react';
import { connect } from 'react-redux';
import { dndContainer, dndElement } from '../dragDrop';
import DraggableItem from './DraggableItem';
import * as actions from '../actions';
import { handleDrop } from '../actions/dragDrop';

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
          item => <DraggableItem {...item} key={item.id} />
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
  const onListTitleChange = ev => updateList({
    ...props,
    title: ev.target.value
  });
  const onItemCreated = () => updateList({});
};

const mapStateToProps = (state, ownProps) => ({
  items: ownProps.items.map(itemId => state.items[itemId])
});

const mapDispatchToProps = dispatch => ({
  onItemDrop: dropInfo => dispatch(
    handleDrop('lists', 'items')(dropInfo)
  ),
  updateList: list => dispatch(actions.lists.updateSuccess(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDraggableList);
