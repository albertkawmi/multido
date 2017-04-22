import { connect } from 'react-redux';
import Space from './Space';
import { createBoard, updateSpace } from '../../actions/crud';

const mapStateToProps = (state, { space }) => ({
  boards: space.boards.map(boardId => state.boards[boardId])
});

const mapDispatchToProps = (dispatch, { space }) => ({
  onBoardCreated: () => dispatch(
    createBoard(space.id)
  ),
  onTitleChange: ev => dispatch(
    updateSpace({ ...space, title: ev.target.value })
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
