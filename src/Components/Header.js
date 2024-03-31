// Header.js

import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
// import './Curd.css'

function Header() {
  return (
    <>
    <header className="header">
      
      <nav>
        <ul>
        <h1>To Do List ...</h1>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/yourtask">Your Task</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
        </ul>
      </nav>
    </header>
    {/* <div className='addfunc'>
      <Curd/> */}
    {/* </div> */}
    </>
  );
}

export default Header;
