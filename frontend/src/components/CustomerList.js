import React, { useEffect, useState } from 'react';
import './styles.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('http://127.0.0.1:8000/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error("Fetch error:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://127.0.0.1:8000/api/customers/${editId}`
      : 'http://127.0.0.1:8000/api/customers';

    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Validation or server error');

      await fetchCustomers();
      setForm({ name: '', email: '', phone: '', address: '' });
      setEditId(null);
    } catch (err) {
      alert("Failed to submit customer. Please check the data.");
      console.error(err);
    }
  };

  const handleEdit = (customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || ''
    });
    setEditId(customer.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    await fetch(`http://127.0.0.1:8000/api/customers/${id}`, {
      method: 'DELETE'
    });

    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="form-container">
      <h2>Customers</h2>

      <form onSubmit={handleSubmit} className="form-row">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit">{editId ? "Update Customer" : "Add Customer"}</button>
        {editId && (
          <button
            type="button"
            style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
            onClick={() => {
              setEditId(null);
              setForm({ name: '', email: '', phone: '', address: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="list-display">
        {customers.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.email} | {c.phone || 'N/A'} <br />
            📍 {c.address || 'N/A'}
            <br />
            <button onClick={() => handleEdit(c)} style={{ marginRight: '8px', padding: '2px 8px' }}>
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(c.id)} style={{ backgroundColor: 'red', color: 'white', padding: '2px 8px' }}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
