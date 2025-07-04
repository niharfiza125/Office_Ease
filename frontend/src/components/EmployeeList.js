import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/employees');
    setEmployees(res.data);
  };

  // Fetch departments for dropdown
  const fetchDepartments = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/departments');
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  // Add or Update
  const handleSubmit = async () => {
    if (!name || !email || !departmentId) return;

    const payload = { name, email, department_id: departmentId };

    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/employees/${editingId}`, payload);
      } else {
        await axios.post('http://127.0.0.1:8000/api/employees', payload);
      }

      setName('');
      setEmail('');
      setDepartmentId('');
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Error submitting employee:', err);
    }
  };

  // Edit
  const handleEdit = (emp) => {
    setName(emp.name);
    setEmail(emp.email);
    setDepartmentId(emp.department_id);
    setEditingId(emp.id);
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container mt-4">
      <h2>👩‍💼 Employee List</h2>

      <div className="d-flex mb-2 gap-2">
        <input className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select className="form-control" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
        <button className="btn btn-success" onClick={handleSubmit}>
          {editingId ? 'Update' : 'Add'} Employee
        </button>
      </div>

      <ul className="list-group">
        {employees.length === 0 ? (
          <li className="list-group-item">No employees found.</li>
        ) : (
          employees.map(emp => (
            <li key={emp.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{emp.name} — {emp.email} (Dept ID: {emp.department_id})</span>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default EmployeeList;
