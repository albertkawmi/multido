import React from 'react';
import { Link } from 'react-router-dom';

const ListSpaces = ({ spaces }) =>
  <main>
    <ul className="list-spaces">
      {spaces.map(space => <LinkToSpace key={space.id} {...space} />)}
    </ul>
  </main>

const LinkToSpace = ({ id, title }) =>
  <li className="list-spaces__link">
    <Link to={`/spaces/${id}`}>
    {title}
    </Link>
  </li>

export default ListSpaces;
