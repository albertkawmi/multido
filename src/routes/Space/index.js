import React from 'react';
import { connect } from 'react-redux';
import Space from './Space';
import { createRow, updateSpace } from '../../actions/crud';

// TODO: refactor to avoid having separate SpaceContainer
const SpaceContainer = ({ spaces, rows, match, dispatch }) =>
  <Space
    space={spaces[match.params.id]}
    onRowCreated={
      () => dispatch(
        createRow(match.params.id)
      )
    }
    onTitleChange={
      ev => dispatch(
        updateSpace({ ...spaces[match.params.id], title: ev.target.value })
      )
    }
    rows={
      spaces[match.params.id].rows
        .map(rowId => rows[rowId])
    }
  />

const mapStateToProps = (state) => ({
  spaces: state.spaces,
  rows: state.rows
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SpaceContainer);
