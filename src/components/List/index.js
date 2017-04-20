import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { createItem, updateList } from '../../actions/crud';
import { handleItemDrop } from '../../actions/dragDrop';

const ListContainer = ({ updateList, handleItemDrop, createItem, ...list }) =>
  <List {...list}
    onListTitleChange={ev => updateList({
      ...list,
      title: ev.target.value
    })}
    onItemCreated={() => createItem(list.id)}
    onItemDrop={handleItemDrop}
  />

const mapStateToProps = (state, ownProps) => ({
  listItems: ownProps.items.map(itemId => state.items[itemId])
});

const mapDispatchToProps = {
  handleItemDrop,
  updateList,
  createItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
