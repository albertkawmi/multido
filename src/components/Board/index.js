import { connect } from 'react-redux';
import Board from './Board';
import { createList, updateBoard } from '../../actions/crud';
import { handleListDrop } from '../../actions/dragDrop';

const mapStateToProps = (state, { board }) => ({
  lists: board.lists.map(listId => state.lists[listId])
});

const mapDispatchToProps = (dispatch, { board }) => ({
  onTitleChange: ev => dispatch(
    updateBoard({ ...board, title: ev.target.value })
  ),
  onListCreated: () => dispatch(
    createList(board.id)
  ),
  onListDrop: dropInfo => dispatch(
    handleListDrop(dropInfo)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
