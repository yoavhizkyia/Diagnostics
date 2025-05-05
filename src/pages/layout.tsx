import React from "react";
import { Link } from "react-router-dom";

import "./layout.css";
import Logo from '../assets/icons/datamind-logo.svg'
import Exit from '../assets/icons/exit-btn.png'


const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="industry-logo">
          <Link to="/dashboard">🏭</Link>
        </div>
        <Link to="/info">ℹ️</Link>
        <Link to="/alerts">🔔</Link>
        <Link to="/files">📁</Link>
        <Link to="/settings">⚙️</Link>
        <div className="actions-container">
          <img src={Exit} alt={'exit logo'} className="exit-logo"/>
          <div className="eg-logo">EG</div>
        </div>
      </aside>
      <div className="main">
        <header className="navbar">
          <img src={Logo} alt="Logo" />
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;