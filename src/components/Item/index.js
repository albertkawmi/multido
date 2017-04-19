import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { updateFor } from '../../actions/crud';

const ItemContainer = ({ item, updateItem, ...props }) =>
  <Item
    {...props}
    onTextChange={ev => updateItem({
      ...item,
      text: ev.target.value
    })}
    onToggleCompleted={() => updateItem({
      ...item,
      completed: !item.completed
    })}
  />;

const mapStateToProps = (state, { id, text, completed }) => ({
  item: {
    id,
    text,
    completed
  }
});

const mapDispatchToProps = {
  updateItem: updateFor('items')
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
