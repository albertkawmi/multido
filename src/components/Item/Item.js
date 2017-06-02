import React from 'react';
import { dndElement } from 'react-dragula-hoc';
import { TextArea, Icon } from '../UI';

const itemClassname = completed => [
  'item__textarea',
  completed && 'item__textarea--completed',
].filter(Boolean).join(' ');

export const Item = ({
  item: { id, text, completed },
  selected,
  onTextChange,
  onToggleCompleted,
  onSelected,
  onDelete
}) =>
  <li className="item">
    <ItemHandle selected={selected} onSelected={onSelected} />
    <TextArea
      className={itemClassname(completed)}
      onChange={onTextChange}
      value={text}
    />
    <div className="item__menu">
      <Icon name="x" tooltip="Delete Item" onClick={onDelete} />
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

const ItemHandle = ({ selected, onSelected }) =>
  <div className={`item__handle ${selected ? 'selected' : ''}`}
    onDoubleClick={onSelected} />

const DraggableItem = dndElement({
  type: 'items'
})(Item);

export default DraggableItem;
