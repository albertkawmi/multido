import React from 'react';
import Radium from 'radium';
import { dndElement } from 'react-dragula-hoc';
import { TextArea } from '../UI';
import { getTextAreaStyle } from './styles';

export const Item = ({
  item: { id, text, completed },
  onTextChange,
  onToggleCompleted
}) =>
  <li className="item">
    <span className="item__handle" />
    <TextArea
      onChange={onTextChange}
      value={text}
      placeholder="(empty)"
      style={getTextAreaStyle(completed)}
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

export default Radium(DraggableItem);
