import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <header id="main-header">
        <div className="header-content">
            <Link to="/">
                <img src={logo} height={50} alt="Stackoverflow" />            
            </Link>
        </div>
    </header>
  );
}
