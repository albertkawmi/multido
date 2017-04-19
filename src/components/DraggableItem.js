import React from 'react';
import { connect } from 'react-redux';
import { dndElement } from '../dragDrop';
import { context } from '../config';
import actions from '../actions/items';

const itemClassname = completed =>
  `item__textarea ${completed ? 'item__textarea--completed' : ''}`;

const itemTextHeight = text => ({
  height: `${Math.ceil(
    text.replace('\n', '').length / 27 +
    1.1 * text.split('\n').length - 1 + 0.25)
  }rem`
});

const Item = ({ id, text, completed, updateText, toggleCompleted }) => (
  <li className="item">
    <span className="item__handle" />
    <textarea
      className={itemClassname(completed) + ' dynamic-textarea'}
      style={itemTextHeight(text)}
      onChange={updateText}
      value={text}
      placeholder="(empty)"
    />
    <input
      className="item__checkbox"
      id={id}
      type="checkbox"
      checked={completed}
      onChange={toggleCompleted}
      />
  </li>
);

Item.contextTypes = context;

const DraggableItem = dndElement({
  type: 'item'
})(Item);

const mapDispatchToProps = {
  updateItem: actions.updateSuccess
};

const ConnectedDraggableItem = (props) => {
  const { updateItem, ...otherProps } = props;
  const toggleCompleted = () => updateItem({
    ...props,
    completed: !props.completed
  });
  const updateText = ev => updateItem({
    ...props,
    text: ev.target.value
  });
  return <DraggableItem {...otherProps}
    updateText={updateText}
    toggleCompleted={toggleCompleted}
    />;
};

export default connect(
  null,
  mapDispatchToProps
)(ConnectedDraggableItem);
