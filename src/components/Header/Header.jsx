import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Header = () => {
    const {user, logOut} = useContext(AuthContext)
    console.log(user)

    const handleLogout =() => {
        
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
            <Link to="/">Shop</Link>
            <Link to="/orders">orders</Link>
            <Link to="/inventory">inventory</Link>
            <Link to="/login">login</Link>
            <Link to="/signUp">SignUp</Link>
            {user && <span>Welcome {user.email} <button onClick={handleLogout}>Sign Out </button></span>}
            </div>
        </nav>
    );
};

export default Header;