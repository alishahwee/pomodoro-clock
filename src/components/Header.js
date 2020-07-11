import React from 'react';
import headerImg from '../images/header.png';

function Header() {
  return (
    <div className='Header'>
      <img src={headerImg} alt='header' />
      <h2>the time management system for procrascinators</h2>
    </div>
  );
}

export default Header;
