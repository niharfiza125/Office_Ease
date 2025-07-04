import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';

import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import SupplierList from './components/SupplierList';
import PurchaseList from './components/PurchaseList';
import CustomerList from './components/CustomerList';
import SalesList from './components/SalesList';
import AttendanceList from './components/AttendanceList';
import LeaveList from './components/LeaveList';

import './components/styles.css';

function App() {
  const path = window.location.pathname;
  const hideNavbar = path === '/admin/login';

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {!hideNavbar && <Navbar />}
        <div
          style={{
            marginLeft: !hideNavbar ? '220px' : '0',
            padding: '20px',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/attendances" element={<AttendanceList />} />
            <Route path="/leaves" element={<LeaveList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
