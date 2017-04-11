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
  handleItemDrop({ source, target }) {
    this.setState({
      lists: {
        ...this.state.lists,
        [source.id]: {
          ...this.state.lists[source.id],
          items: source.elements
        },
        [target.id]: {
          ...this.state.lists[target.id],
          items: target.elements
        }
      }
    });
  }
  handleListDrop({ source, target }) {
    this.setState({
      boards: {
        ...this.state.boards,
        board1: {
          ...this.state.boards.board1,
          lists: source.elements
        }
      }
    });
  }
  render() {
    const { boards, lists, items } = this.state;
    const { board1: board } = boards;
    return (
      <DndBoard onDrop={this.handleListDrop.bind(this)}>
        {board.lists.map(listId => {
          const list = lists[listId];
          return list && <DraggableList {...list} key={list.id} onDrop={this.handleItemDrop.bind(this)}>
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

class Board extends Component {
  render() {
    return <div className="board">{this.props.children}</div>;
  }
}

const DndBoard = dndContainer({
  containerType: 'board',
  acceptType: 'list',
  handleClassName: 'list__handle',
  direction: 'vertical'
})(Board);

class List extends Component {
  render() {
    return (
      <ul className="list">
        {this.props.children}
      </ul>
    );
  }
}

const ContainerList = dndContainer({
  containerType: 'list',
  acceptType: 'item',
  handleClassName: 'item__handle',
  direction: 'vertical'
})(List);

class ListWithHandle extends Component {
  render() {
    return (
      <div>
        <div className="list__handle" />
        <ContainerList {...this.props} />
      </div>
    );
  }
}

const DraggableList = dndElement({
  type: 'list',
})(ListWithHandle);


class Item extends Component {
  render() {
    return <li className="item">
      <span className="item__handle" />
      {this.props.text}
    </li>
  }
}

const DraggableListItem = dndElement({
  type: 'item'
})(Item);
