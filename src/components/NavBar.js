import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const activeStyle = {
    color: 'red',
  };

  return (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about/foo">About Foo</Link></li>
            <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
            <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
            <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
        </ul>
    </div>
  );
}

export default NavBar;