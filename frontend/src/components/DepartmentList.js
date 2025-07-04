import React, { useEffect, useState } from 'react';
import './styles.css';

const DepartmentList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({"name": ""});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/departments')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      setItems([...items, data]);
      setForm({"name": ""});
    });
  };

  return (
    <div className="form-container">
      <h2>Department</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Department Name" value={form.name} onChange={handleChange} />
        <button type="submit">Add Department</button>
      </form>
      <ul>
      {items.map((department, index) => (
  <li key={department.id}>
    <strong>{department.name}</strong> (ID: {department.id})
  </li>
))}

      </ul>
    </div>
  );
};

export default DepartmentList;
