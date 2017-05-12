import React from 'react';
import { dndElement } from 'react-dragula-hoc';
import { TextArea, Icon } from '../UI';

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
    <div className="item__handle" />
    <TextArea
      className={itemClassname(completed)}
      onChange={onTextChange}
      value={text}
    />
    <div className="item__menu">
      <Icon name="x" />
      <input
        className="item__checkbox"
        id={id}
        type="checkbox"
        checked={completed}
        onChange={onToggleCompleted}
        style={{ display: 'none' }}
      />
    </div>
  </li>

const DraggableItem = dndElement({
  type: 'items'
})(Item);

export default DraggableItem;
