import React from 'react';
import { useScrollDirection } from '../Hooks/useScrollDirection';
import { NavLink } from 'react-router-dom';
import LogoImage from '../img/logo.png'; 
import styles from './Header.module.css';

const Header = () => {
  const { scrollDirection } = useScrollDirection();

  const menuItems = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Ideas', path: '/' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const headerClasses = `
    ${styles.header} 
    ${scrollDirection === 'down' ? styles.headerHidden : ''}
  `;

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        {/* Logo */}
        <img src={LogoImage} alt='logo' className={styles.logo} />

        {/* Navigation */}
        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }>
                
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;