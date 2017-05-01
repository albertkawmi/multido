import React from 'react';
import { dndElement } from 'react-dragula-hoc';
import { TextArea } from '../UI';

const itemClassname = completed => [
  'item__textarea',
  completed && 'item__textarea--completed',
].filter(Boolean).join(' ');

export const Item = ({
  item: { id, text, completed },
  onTextChange,
  onToggleCompleted
}) =>
  <li className="item">
    <span className="item__handle" />
    <TextArea
      className={itemClassname(completed)}
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
