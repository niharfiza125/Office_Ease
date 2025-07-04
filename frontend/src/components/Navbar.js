import React from 'react';
import { Link } from 'react-router-dom';
import logoutAdmin from '../utils/logout'; // ✅ import the logout logic
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <h2>ERP Dashboard</h2>
        <button className="logout-button" onClick={logoutAdmin}>Logout</button>
      </div>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/suppliers">Suppliers</Link></li>
        <li><Link to="/purchases">Purchases</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/attendances">Attendances</Link></li>
        <li><Link to="/leaves">Leaves</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;

