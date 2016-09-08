import React, { Component, PropTypes } from 'react';

const CONTEXT = {
  actions: PropTypes.object
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: {
        list1: ['item1', 'item2', 'item3'],
        list2: ['item4', 'item5', 'item6']
      },
      items: {
        item1: { id: 'item1', text: 'Item 1', completed: false },
        item2: { id: 'item2', text: 'Item 2', completed: false },
        item3: { id: 'item3', text: 'Item 3', completed: false },
        item4: { id: 'item4', text: 'Item 4', completed: false },
        item5: { id: 'item5', text: 'Item 5', completed: false },
        item6: { id: 'item6', text: 'Item 6', completed: false }
      }
    }
  }
  getChildContext() {
    return {
      actions: {
        createList: (id, items) => this.setState({
          lists: {
            ...this.state.lists,
            [id]: items
          }
        }),
        toggleItem: (id) => this.setState({
          items: {
            ...this.state.items,
            [id]: {
              ...this.state.items[id],
              completed: !this.state.items[id].completed
            }
          }
        }),
        getList: (id) => this.state.lists[id],
        getItem: (id) => this.state.items[id],
      }
    };
  }
  render() {
    return <Board lists={this.state.lists} />;
  }
}

App.childContextTypes = CONTEXT;

const Board = ({ lists }, { actions }) =>
  <div>
    {Object.keys(lists).map(listId =>
      <List key={listId} items={actions.getList(listId)} />
    )}
  </div>;

const List = ({ items }, { actions }) =>
  <ul>
    {items.map(itemId => <Item key={itemId} {...actions.getItem(itemId)} />)}
  </ul>;

const Item = ({ id, text, completed }, { actions }) =>
  <li>
    <input
      id={id}
      type="checkbox"
      checked={completed}
      onChange={() => actions.toggleItem(id)}
      />
    <span style={{
      color: completed ? 'gray' : 'black',
      textDecoration: completed ? 'line-through' : 'none'
    }}>{text}</span>
  </li>;

Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;

