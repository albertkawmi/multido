import React, { Component } from 'react';
import initialState from './data';
import { dndContainer, dndElement } from './dragDrop';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }
  handleDrop(parentKey, childKey) {
    return ({ source, target }) => this.setState({
      [parentKey]: {
        ...this.state[parentKey],
        [source.id]: {
          ...this.state[parentKey][source.id],
          [childKey]: source.elements
        },
        [target.id]: {
          ...this.state[parentKey][target.id],
          [childKey]: target.elements
        }
      }
    });
  }
  render() {
    const { boards, lists, items } = this.state;
    const { board1: board } = boards;
    return (
      <DndBoard onDrop={this.handleDrop('boards', 'lists')}>
        {board.lists.map(listId => {
          const list = lists[listId];
          return list && <DraggableList {...list} key={list.id} onDrop={this.handleDrop('lists', 'items')}>
            {list.items.map(itemId => {
              const item = items[itemId];
              return (
                item && <DraggableListItem {...item} key={item.id} />
              );
            })}
          </DraggableList>
        })}
      </DndBoard>
    );
  }
}

const Board = ({ children }) => <div className="board">{children}</div>;

const DndBoard = dndContainer({
  containerType: 'board',
  acceptType: 'list',
  handleClassName: 'list__handle',
  direction: 'vertical'
})(Board);

const List = ({ children }) => <ul className="list">{children}</ul>;

const ContainerList = dndContainer({
  containerType: 'list',
  acceptType: 'item',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(List);

const ListWithHandle = props => (
  <div>
    <div className="list__handle" />
    <ContainerList {...props} />
  </div>
);

const DraggableList = dndElement({
  type: 'list',
})(ListWithHandle);

const Item = ({ text }) => (
  <li className="item">
    <span className="item__handle" />
    {text}
  </li>
);

const DraggableListItem = dndElement({
  type: 'item'
})(Item);
