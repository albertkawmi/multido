import React from 'react';
import { connect } from 'react-redux';
import Space from './Space';
import { createBoard, updateSpace } from '../../actions/crud';

// TODO: refactor to avoid having separate SpaceContainer
const SpaceContainer = ({ spaces, boards, match, dispatch }) =>
  <Space
    space={spaces[match.params.id]}
    onBoardCreated={
      () => dispatch(
        createBoard(match.params.id)
      )
    }
    onTitleChange={
      ev => dispatch(
        updateSpace({ ...spaces[match.params.id], title: ev.target.value })
      )
    }
    boards={
      spaces[match.params.id].boards
        .map(boardId => boards[boardId])
    }
  />

const mapStateToProps = (state) => ({
  spaces: state.spaces,
  boards: state.boards
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SpaceContainer);
