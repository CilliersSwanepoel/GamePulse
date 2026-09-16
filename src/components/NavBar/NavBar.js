import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

// Every link you want in the menu goes in this list.
const links = [
    { path: '/', text: 'Home' },
    { path: '/browse', text: 'Browse Games' },
];

const NavBar = ({ isOpen, setIsOpen }) => {
    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Top bar: logo on the left, hamburger button on the right */}
            <header className={isOpen ? 'Header Header--open' : 'Header'}>
                <Link to="/" className="Header-logo" onClick={closeMenu}>
                    GamePulse
                </Link>

                <button className="Header-button" onClick={toggleMenu} aria-label="Toggle menu">
                    <span></span>
                </button>
            </header>

            {/* The menu itself - sits hidden above the screen until opened */}
            <nav className={isOpen ? 'Menu Menu--open' : 'Menu'}>
                <ul className="Menu-list">
                    {links.map((link) => (
                        <li key={link.path} className="Menu-item">
                            <NavLink
                                to={link.path}
                                end={link.path === '/'}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive ? 'Menu-link Menu-link--active' : 'Menu-link'
                                }
                            >
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default NavBar;
