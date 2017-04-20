import React, { Component } from 'react';
import Board from './Board';
import { connect } from 'react-redux';

class Test extends Component {
	render() {
		const { board, lists } = this.props;
		return <Board {...board} lists={lists} />;
	}
}

const mapStateToProps = (state, ownProps) => ({
	board: state.boards.bd1,
	lists: state.boards.bd1.lists.map(listId => state.lists[listId])
});

export default connect(mapStateToProps)(Test);
