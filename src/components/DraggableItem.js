import React from 'react';
import { dndElement } from '../dragDrop';
import { context } from '../config';

const itemClassname = completed =>
  `item__textarea ${completed ? 'item__textarea--completed' : ''}`;

const itemTextHeight = text => ({
  height: `${Math.ceil(
    text.replace('\n', '').length / 27 +
    1.1 * text.split('\n').length - 1 + 0.25)
  }rem`
});

const Item = ({ id, text, completed }, { actions }) => (
  <li className="item">
    <span className="item__handle" />
    <textarea
      className={itemClassname(completed) + ' dynamic-textarea'}
      style={itemTextHeight(text)}
      onChange={ev => actions.update.items(id, { text: ev.target.value })}
      value={text}
      placeholder="(empty)"
    />
    <input
      className="item__checkbox"
      id={id}
      type="checkbox"
      checked={completed}
      onChange={() => actions.update.items(id, { completed: !completed })}
      />
  </li>
);

Item.contextTypes = context;

const DraggableItem = dndElement({
  type: 'item'
})(Item);

export default DraggableItem;
