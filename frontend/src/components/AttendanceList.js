import React, { useEffect, useState } from 'react';
import './styles.css';

const AttendanceList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ employee_id: "", date: "", status: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = () => {
    fetch('http://127.0.0.1:8000/api/attendances')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId 
      ? `http://127.0.0.1:8000/api/attendances/${editId}` 
      : 'http://127.0.0.1:8000/api/attendances';

    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      alert("Error while submitting attendance.");
      return;
    }

    fetchAttendances();
    setForm({ employee_id: "", date: "", status: "" });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      employee_id: item.employee_id,
      date: item.date,
      status: item.status
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
    if (!confirmDelete) return;

    await fetch(`http://127.0.0.1:8000/api/attendances/${id}`, {
      method: 'DELETE'
    });

    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="form-container">
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          name="status"
          placeholder="Status (e.g., Present/Absent)"
          value={form.status}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update Attendance" : "Add Attendance"}</button>
        {editId && (
          <button
            type="button"
            style={{ marginLeft: '10px', background: '#ccc' }}
            onClick={() => {
              setForm({ employee_id: "", date: "", status: "" });
              setEditId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Employee ID:</strong> {item.employee_id},&nbsp;
            <strong>Date:</strong> {item.date},&nbsp;
            <strong>Status:</strong> {item.status}
            <button
              onClick={() => handleEdit(item)}
              style={{ marginLeft: '10px', padding: '2px 8px' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: '5px', padding: '2px 8px', color: 'white', backgroundColor: 'red', border: 'none' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
