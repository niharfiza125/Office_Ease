import React, { useEffect, useState } from 'react';
import './styles.css';

const LeaveList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    type: "",
    status: "pending"
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    fetch('http://127.0.0.1:8000/api/leaves')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId 
      ? `http://127.0.0.1:8000/api/leaves/${editId}` 
      : 'http://127.0.0.1:8000/api/leaves';

    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Validation Error:', errorData);
        alert('Something went wrong. Please check the form.');
        return;
      }

      fetchLeaves(); // refresh list
      setForm({ employee_id: '', start_date: '', end_date: '', type: '', status: 'pending' });
      setEditId(null);
    } catch (err) {
      console.error('Network error:', err);
      alert('Network or server error.');
    }
  };

  const handleEdit = (leave) => {
    setEditId(leave.id);
    setForm({
      employee_id: leave.employee_id,
      start_date: leave.start_date,
      end_date: leave.end_date,
      type: leave.type,
      status: leave.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;

    await fetch(`http://127.0.0.1:8000/api/leaves/${id}`, {
      method: 'DELETE'
    });

    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="form-container">
      <h2>Leave</h2>
      <form onSubmit={handleSubmit}>
        <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} />
        <input name="start_date" type="date" value={form.start_date} onChange={handleChange} />
        <input name="end_date" type="date" value={form.end_date} onChange={handleChange} />
        <input name="type" placeholder="Leave Type (e.g., Sick, Casual)" value={form.type} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">{editId ? "Update Leave" : "Add Leave"}</button>
        {editId && <button onClick={() => { setEditId(null); setForm({ employee_id: '', start_date: '', end_date: '', type: '', status: 'pending' }); }} type="button">Cancel</button>}
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Employee ID:</strong> {item.employee_id}, 
            <strong> Type:</strong> {item.type}, 
            <strong> From:</strong> {item.start_date}, 
            <strong> To:</strong> {item.end_date}, 
            <strong> Status:</strong> {item.status}
            <button onClick={() => handleEdit(item)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveList;
