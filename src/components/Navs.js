import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

function Navs() {
  return (
    <div>
      <ul>
        {LINKS.map((item, index) => (
          <li key={index}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navs;
