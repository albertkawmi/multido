import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { updateFor, create } from '../../actions/crud';
import { createDropHandler } from '../../actions/dragDrop';

const ListContainer = ({ updateList, handleDrop, createItem, ...list }) =>
  <List {...list}
    onListTitleChange={ev => updateList({
      ...list,
      title: ev.target.value
    })}
    onItemCreated={() => createItem(list.id)}
    onItemDrop={handleDrop}
  />;

const mapStateToProps = (state, ownProps) => ({
  listItems: ownProps.items.map(itemId => state.items[itemId])
});

const mapDispatchToProps = {
  handleDrop: createDropHandler('lists', 'items'),
  updateList: updateFor('lists'),
  createItem: create('item')
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
