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
  handleListDrop() {

  }
  render() {
    const { lists, items } = this.state;
    const { list1, list2 } = lists;
    return (
      <DndBoard onDrop={this.handleListDrop.bind(this)}>
        <DraggableList {...list1} onDrop={this.handleItemDrop.bind(this)}>
          {list1.items.map(itemId => {
            const item = items[itemId];
            return (
              <DraggableListItem {...item} key={item.id} />
            );
          })}
        </DraggableList>
        <DraggableList {...list2} onDrop={this.handleItemDrop.bind(this)}>
          {list2.items.map(itemId => {
            const item = items[itemId];
            return (
              <DraggableListItem {...item} key={item.id} />
            );
          })}
        </DraggableList>
      </DndBoard>
    );
  }
}

class Board extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

const DndBoard = dndContainer({
  containerType: 'board',
  acceptType: 'list',
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
  // handleClassName: 'item-handle',
  direction: 'vertical'
})(List);

const DraggableList = dndElement({
  type: 'list'
})(ContainerList);

class Item extends Component {
  render() {
    return <li className="item">{this.props.text}</li>
  }
}

const DraggableListItem = dndElement({
  type: 'item'
})(Item);
