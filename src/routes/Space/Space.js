import React from 'react';
import Row from '../../components/Row';

const Space = (props) =>
  <main className="space">
    <SpaceInfo {...props} />
    <Rows {...props} />
  </main>

const SpaceInfo = ({ space, onTitleChange }) =>
  <div className="space__info">
    <input
      className="space__title"
      value={space.title}
      onChange={onTitleChange}
      placeholder="(untitled)"
    />
  </div>

const Rows = ({ rows, onRowCreated }) =>
  <div className="rows">
    {rows.map(
      row => <Row row={row} id={row.id} key={row.id} />
    )}
    <button
      className="new-row-btn"
      onClick={onRowCreated}>
      + New Row
    </button>
  </div>

export default Space;
