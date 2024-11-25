import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navItems = [
        { to: '/', label: 'Головна' },
        { to: '/about', label: 'Про нас' },
        { to: '/cars', label: 'Автомобілі' },
        { to: '/contact', label: 'Контакти' },
    ];

    return (
        <nav className="navbar">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;
