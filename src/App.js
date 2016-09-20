import React, { Component, PropTypes } from 'react';
import initialState from './data';
import bindActions from './actions';
import dragDrop from './dragDrop';
import DragAndDrop from './DragAndDrop';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.update = this.update.bind(this);
  }
  getChildContext() {
    return {
      actions: bindActions(this),
      dragDrop
    };
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }
  update({ source, target }) {
    const newLists = {...this.state.lists};
    newLists[target.id].items = target.items;
    if (source.id !== target.id) {
      newLists[source.id].items = source.items;
    }
    this.setState({ lists: newLists });
  }
  render() {
    // return <Boards boards={this.state.boards} />;

    return <DragAndDrop
      lists={this.state.lists}
      onChange={this.update}
      handleClassName="item__handle"
      ItemComponent={Item}
      itemClassName="item"
      ListComponent={List}
      listClassName="list__items"
    />;
  }
}

class Boards extends Component {  
  componentWillMount() {
    const { dragDrop, actions } = this.context;
    dragDrop.items.on('drop', actions.handleItemDropped);
    dragDrop.lists.on('drop', actions.handleListDropped);
  }
  render() {
    const { boards } = this.props;
    const { actions } = this.context;

    return <main className="boards">
      {Object.keys(boards).map(
        boardId => <Board
          {...actions.get('boards', boardId)}
          boardId={boardId}
          key={`${boardId}-${actions.get('boards', boardId).lists.length}`} />
      )}
      <button
        className="new-board-btn"
        onClick={() => actions.addNewBoard()}>+ New Board</button>
    </main>;
  }
}

class Board extends Component {
  render() {
    const { lists, title, boardId } = this.props;
    const { actions, dragDrop } = this.context;
    const listsDragDrop = el =>
      dragDrop.lists.containers.push(el);

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
        <section ref={listsDragDrop} className="board__items" data-board-id={boardId}>
        {lists.map(listId => {
          const list = actions.get('lists', listId);
          return <List
            listId={listId}
            key={`${listId}-${list.items.length}`} // re-render whole list when items added or removed
            items={list.items}
            title={list.title} />;        
        })}       
        </section>
        <button
          className="board__new-list"
          onClick={() => actions.addListToBoard(boardId)} >
          + New List
        </button>
      </div>
    );
  }
}

class List extends Component {
  render() {
    const { actions } = this.context;
    const { listId } = this.props;
    const { items, title } = actions.get('lists', listId);
    const itemsDragDrop = el =>
      dragDrop.items.containers.push(el);

    return (
      <div>
        <input
          className="list__title"
          onChange={ev => actions.update.lists(
            listId,
            { title: ev.target.value }
          )}
          value={title}
          placeholder="(untitled)"
        />
        {this.props.children}
        <button className="list__add-item" onClick={() => actions.addItemToList(listId)}>+ Add an item</button>
      </div>
    );
  }
}

const itemClassname = completed =>
  `item__textarea ${completed ? 'item__textarea--completed' : ''}`;

const itemTextHeight = text => ({
  height: `${Math.ceil(
    text.replace('\n', '').length / 27 +
    1.1 * text.split('\n').length - 1 + 0.25)
  }rem`
});

const Item = ({ itemId }, { actions }) => {
  const { id, text, completed } = actions.get('items', itemId);
  return <div>
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
  </div>;
}

const CONTEXT = {
  actions: PropTypes.object,
  dragDrop: PropTypes.object
}

App.childContextTypes = CONTEXT;
Boards.contextTypes = CONTEXT;
Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;

