import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <Link to="/" className="navbar-brand">Uber Easy</Link>
                <Link to="/home"> Home </Link>
                <Link to="/destination"> Destination</Link>
                <Link to="/blog"> Blog </Link>
                <Link to="/contact"> Contact </Link>
                <Link to="/login"> Login </Link>
            </nav>
        </div>
    );
};

export default Header;