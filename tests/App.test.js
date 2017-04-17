import React from 'react';
import ReactDOM from 'react-dom';
import Boards from '../src/components/Boards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Boards />, div);
});
