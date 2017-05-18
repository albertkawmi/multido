import React from 'react';
import Row from '../../components/Row';

const Space = (props) =>
  <main>
    <div className="space">
      <Rows {...props} />
      <Pane />
    </div>
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

const Rows = ({ rows, space, onTitleChange, onRowCreated }) =>
  <div className="rows">
    <SpaceInfo space={space} onTitleChange={onTitleChange} />
    {rows.map(
      row => <Row row={row} id={row.id} key={row.id} />
    )}
    <button
      className="new-row-btn"
      onClick={onRowCreated}>
      + New Row
    </button>
  </div>

const Pane = () =>
  <div className="pane">
    <h3>This is a pane</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia omnis a corporis iusto! Obcaecati placeat qui, voluptate asperiores! Harum necessitatibus minima possimus ipsum dolor, libero et. Quidem, error soluta est.</p>
  </div>

export default Space;
