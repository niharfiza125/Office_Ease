import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient'; // Adjust path if needed

import './styles.css';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin/login';
    return;
  }

  apiClient.get('/reports/summary')
    .then(res => {
      console.log("✅ Summary:", res.data);
      setSummary(res.data);
    })
    .catch(err => {
      console.error("Failed to load summary:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    });

  apiClient.get('/reports/departments')
    .then(res => {
      console.log("📁 Departments:", res.data);
      setDepartments(res.data);
    })
    .catch(err => {
      console.error("Failed to load departments:", err);
    });
}, []);



  if (!summary) return <div className="loading">Loading Dashboard...</div>;

   const cards = [
  { label: '👥 Total Employees', value: summary.total_employees },
  { label: '🧑‍🤝‍🧑 Total Customers', value: summary.total_customers },
  { label: '📦 Total Products', value: summary.total_products },
  { label: '🏭 Total Suppliers', value: summary.total_suppliers },
  { label: '💰 Total Sales', value: `Rs. ${summary.total_sales}` },
  { label: '🛒 Total Purchases', value: `Rs. ${summary.total_purchases}` },
  { label: '📉 Total Expenses', value: `Rs. ${summary.total_expenses}` },
  { label: '⚠️ Low Stock Products', value: summary.low_stock_count },
  { label: '🕒 Pending Leaves', value: summary.pending_leaves },
];

    
  
 return (
  <div className="dashboard">
    <h2 className="dashboard-heading">📊 ERP Summary Dashboard</h2>

    <div className="dashboard-grid">
      {cards.map((card, index) => (
        <div key={index} className="dashboard-card">
          <p className="card-label">{card.label}</p>
          <h3 className="card-value">{card.value}</h3>
        </div>
      ))}
    </div>

    <h3 className="dashboard-subheading">📁 Department-wise Statistics</h3>

{departments.map(dept => (
  <div key={dept.id} style={{ marginBottom: '30px' }}>
    <h4 className="dept-name">{dept.name}</h4>
    
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <p className="card-label">👥 Employees</p>
        <h3 className="card-value">{dept.employee_count}</h3>
      </div>
      <div className="dashboard-card">
        <p className="card-label">📝 Leaves</p>
        <h3 className="card-value">{dept.leave_count}</h3>
      </div>
      <div className="dashboard-card">
        <p className="card-label">📅 Attendance</p>
        <h3 className="card-value">{dept.attendance_count}</h3>
      </div>
    </div>
  </div>
))}

  </div>
);

};

export default Dashboard;
