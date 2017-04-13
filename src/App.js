import React, { Component, PropTypes } from 'react';
import initialState from '../data/sample.json';
import { dndContainer, dndElement } from './dragDrop';
import bindActions from './actions';

export default class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.actions = bindActions(this);
  }
  getChildContext() {
    return {
      actions: this.actions,
    };
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }
  render() {
    const { boards } = this.state;
    return (
      <main className="boards">
        {Object.keys(boards).map(
          boardId => <Board {...boards[boardId]} key={boardId} />
        )}
        <button
          className="new-board-btn"
          onClick={this.actions.addNewBoard}>
          + New Board
        </button>
      </main>
    );
  }
}

/*******************************************************************************
 * Board
 */
const ContainerBoard = ({ children }) => <section className="board__items">{children}</section>;

const DndBoard = dndContainer({
  containerType: 'board',
  acceptType: 'list',
  handleClassName: 'list__title',
  direction: 'horizontal'
})(ContainerBoard);

const Board = ({ title, lists: listIds, id: boardId }, { actions }) => {
  const state = actions.getState();
  const onListDrop = actions.handleDrop('boards', 'lists');
  const lists = listIds.map(listId => state.lists[listId]);
  return (
    <div className="board">
      <input
        className="board__title"
        value={title}
        onChange={ev => actions.update.boards(boardId, {
          title: ev.target.value
        })}
        placeholder="(untitled)"
      />
      <DndBoard id={boardId} onDrop={onListDrop}>
        {lists.map(
          list => <DraggableList {...list} key={list.id} />
        )}
      </DndBoard>
      <button
        className="board__new-list"
        onClick={() => actions.addListToBoard(boardId)} >
        + New List
      </button>
    </div>
  );
}

/*******************************************************************************
 * List
 */
const Items = ({ children }) => <ul className="list__items">{children}</ul>;

const DropItems = dndContainer({
  containerType: 'list',
  acceptType: 'item',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(Items);

const List = ({ id: listId, title, items: itemIds }, { actions }) => {
  const state = actions.getState();
  const items = itemIds.map(itemId => state.items[itemId]);
  const onItemDrop = actions.handleDrop('lists', 'items');
  return (
    <div className="list">
      <input
        className="list__title"
        onChange={ev => actions.update.lists(
          listId,
          { title: ev.target.value }
        )}
        value={title}
        placeholder="(untitled)"
      />
      <DropItems id={listId} onDrop={onItemDrop} >
        {items.map(
          item => <DraggableItem {...item} key={item.id} />
        )}
      </DropItems>
      <button
        className="list__add-item"
        onClick={() => actions.addItemToList(listId)}>
        + Add an item
      </button>
    </div>
  );
}

const DraggableList = dndElement({
  type: 'list',
})(List);

/*******************************************************************************
 * Item
 */
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

const DraggableItem = dndElement({
  type: 'item'
})(Item);

/*******************************************************************************
 * Context boilerplate
 */
const CONTEXT = {
  actions: PropTypes.object
}

Boards.childContextTypes = CONTEXT;
Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;