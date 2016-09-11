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
  componentWillUpdate(nextProps, nextState) {
  	console.log(nextState);
  }
  render() {
		return <Boards boards={this.state.boards} />;
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
	  			{...actions.getBoard(boardId)}
	  			boardId={boardId}
	  			key={`${boardId}-${actions.getBoard(boardId).lists.length}`} />
	  	)}
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
					defaultValue={title}
					placeholder="(untitled)"
				/>
			  <section ref={listsDragDrop} className="board__items" data-board-id={boardId}>
				{lists.map(listId =>
				  <List
					  listId={listId}
				  	key={`${listId}-${actions.getList(listId).items.length}`} // re-render whole list when items added or removed
				  	items={actions.getList(listId).items}
				  	title={actions.getList(listId).title} />
				)}				
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

const listTitleHeight = title => ({
	height: `${Math.ceil(title.length / 27) * 1.5}rem`
});
	

class List extends Component {
	render() {
		const { items, listId, title } = this.props;
		const { actions, dragDrop } = this.context;
		const itemsDragDrop = el =>
			dragDrop.items.containers.push(el);

		return (
			<div className="list">
				<textarea
					className="list__title dynamic-textarea"
					style={listTitleHeight(title)}
					onChange={ev => actions.updateListTitle(
						listId,
						ev.target.value.replace('\n', ' ')
					)}
					value={title}
					placeholder="(untitled)"
				/>
			  <ul className="list__items" ref={itemsDragDrop} data-list-id={listId}>
				{items.map(
					itemId => <Item key={itemId} {...actions.getItem(itemId)} />
				)}
			  </ul>
			  <button className="list__add-item" onClick={() => actions.addItemToList(listId)}>+ Add an item</button>
		  </div>
		);
	}
}

const itemClassname = completed =>
	`item__textarea ${completed ? 'item__textarea--completed' : ''}`;

const itemTextHeight = text => ({
	height: `${Math.ceil(text.length / 27 + text.split('\n').length - 1 + 0.25)}rem`
});

const Item = ({ id, text, completed }, { actions }) =>
  <li className="item" data-item-id={id}>
  	<span className="item__handle" />
		<textarea
			className={itemClassname(completed) + ' dynamic-textarea'}
			style={itemTextHeight(text)}
			onChange={ev => actions.updateItem(id, ev.target.value)}
			value={text}
			placeholder="A new item..."
		/>
		<input
			className="item__checkbox"
		  id={id}
		  type="checkbox"
		  checked={completed}
		  onChange={() => actions.toggleItem(id)}
		  />
  </li>;

App.childContextTypes = CONTEXT;
Boards.contextTypes = CONTEXT;
Board.contextTypes = CONTEXT;
List.contextTypes = CONTEXT;
Item.contextTypes = CONTEXT;

