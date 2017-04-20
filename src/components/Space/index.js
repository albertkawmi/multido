import React from 'react';
import { connect } from 'react-redux';
import Space from './Space';
import { createBoard } from '../../actions/crud';

const SpaceContainer = ({ createBoard, ...space }) =>
  <Space {...space}
    onBoardCreated={() => createBoard(space.id)}
  />

const mapDispatchToProps = {
  createBoard
};

export default connect(null, mapDispatchToProps)(SpaceContainer);
