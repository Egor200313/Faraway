import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';

import '../css/Header.css';
import { useSelector } from 'react-redux';

export function Header(props) {
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  const loc = useLocation();
  let active_num = null;
  if (loc.pathname === '/') {
    if (loc.hash === '#offers') {
      active_num = 1;
    } else {
      active_num = 0;
    }
  }

  return (
    <div className="navbar-wrapper" id="navbar">
      <div className="navbar">
        <div className="menu-left">
          <div className="brand">Faraway</div>
          <div className="menu-item-left active">
            <HashLink
              className={'nav-link' + (active_num ? '' : ' active')}
              to="/#searchzone"
            >
              Search flights
            </HashLink>
          </div>
          <div className="menu-item-left">
            <HashLink
              className={'nav-link' + (active_num ? ' active' : '')}
              to="/#offers"
            >
              Best offers
            </HashLink>
          </div>
        </div>
        <div className="menu-right">
          <div className="menu-item-right">
            {window.localStorage.getItem('ACCESS') ? (
              <Link className="nav-link" to="/profile">
                {user ? user.first_name : 'profile'}
              </Link>
            ) : (
              <Link className="nav-link" to="/login" name="login">
                Login
              </Link>
            )}
            <button
              className="collapse-menu no-click-decoration"
              id="collapse-menu-btn"
              onClick={() => toggleMenu()}
              style={{
                backgroundImage: isMenuExpanded
                  ? 'url(/img/cross-btn.png)'
                  : 'url(/img/menu-icon-0.png)',
              }}
            ></button>
          </div>
        </div>
      </div>
      <div className={'vert-menu ' + (isMenuExpanded ? 'expanded' : 'removed')}>
        <div className="vert-item">
          <Link className="nav-link opened" to="/">
            Search flights
          </Link>
        </div>
        <div className="vert-item">
          <Link className="nav-link opened" to="#offers">
            Best offers
          </Link>
        </div>
      </div>
    </div>
  );
}
