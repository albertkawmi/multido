import React from 'react';
import { dndElement } from '../../dragDrop';

const itemClassname = completed =>
  `item__textarea ${completed ? 'item__textarea--completed' : ''}`;

const itemTextHeight = text => ({
  height: `${Math.ceil(
    text.replace('\n', '').length / 27 +
    1.1 * text.split('\n').length - 1 + 0.25)
  }rem`
});

export const Item = ({
  item: { id, text, completed },
  onTextChange,
  onToggleCompleted
}) =>
  <li className="item">
    <span className="item__handle" />
    <textarea
      className={itemClassname(completed) + ' dynamic-textarea'}
      style={itemTextHeight(text)}
      onChange={onTextChange}
      value={text}
      placeholder="(empty)"
    />
    <input
      className="item__checkbox"
      id={id}
      type="checkbox"
      checked={completed}
      onChange={onToggleCompleted}
      />
  </li>

const DraggableItem = dndElement({
  type: 'items'
})(Item);

export default DraggableItem;
