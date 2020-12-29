import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const activeStyle = {
      color: 'red',
    };
    
    return (
        <div className="header">
            <Link to="/" className="item-display-none">Home</Link>
            <Link to="/about" className="item-display-none">About</Link>
            <Link to="/about/foo" className="item-display-none">About Foo</Link>
            <NavLink exact to="/" className="item" activeClassName="active">Home</NavLink>
            <NavLink exact to="/about" className="item" activeClassName="active">About</NavLink>
            <NavLink to="/about/foo" className="item" activeClassName="active">About Foo</NavLink>
            <NavLink to="/posts" className="item" activeClassName="active">Posts</NavLink>
        </div>
    );
}

export default Menu;
      