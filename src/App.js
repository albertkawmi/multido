import React, { Component, PropTypes } from 'react';
import initialState from './data';
import bindActions from './actions';
import dragDrop from './dragDrop';

const CONTEXT = {
  actions: PropTypes.object,
  dragDrop: PropTypes.object
}

export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = initialState;
  }
  getChildContext() {
		return {
		  actions: bindActions(this),
		  dragDrop
		};
  }
  render() {
		return <Boards boards={this.state.boards} />;
  }
}

class Boards extends Component {	
  componentWillMount() {
  	const { dragDrop, actions } = this.context;
  	dragDrop.items.on('drop', actions.handleItemDropped);
  }
  render() {
  	const { boards } = this.props;
  	const { actions } = this.context;

  	return <div className="boards">
  		{Object.keys(boards).map(
	  		boardId => <Board lists={actions.getBoard(boardId)} key={boardId} />
	  	)}
  	</div>;
  }
}

const Board = ({ lists }, { actions }) =>
  <div className="board">
	{lists.map(listId =>
	  <List
		  listId={listId}
	  	key={`${listId}-${Date.now()}`}
	  	items={actions.getList(listId)} />
	)}
  </div>;

class List extends Component {
	render() {
		const { items, listId } = this.props;
		const { actions, dragDrop } = this.context;
		const initDragDrop = el =>
			dragDrop.items.containers.push(el);

		return (
		  <ul ref={initDragDrop} data-list-id={listId}>
			{items.map(
				itemId => <Item key={itemId} {...actions.getItem(itemId)} />
			)}
		  </ul>
		);
	}
}

const Item = ({ id, text, completed }, { actions }) =>
  <li data-item-id={id}>
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

App.childContextTypes = CONTEXT;
Boards.contextTypes = CONTEXT;
Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;

