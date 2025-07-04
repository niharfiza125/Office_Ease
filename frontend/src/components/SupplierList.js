import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/suppliers/${editingId}`, { name, email });
        setEditingId(null);
      } else {
        await axios.post('http://127.0.0.1:8000/api/suppliers', { name, email });
      }
      setName('');
      setEmail('');
      fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const handleEdit = (supplier) => {
    setName(supplier.name);
    setEmail(supplier.email);
    setEditingId(supplier.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Supplier List</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px 12px' }}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {suppliers.map((supplier) => (
            <li key={supplier.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
              <strong>{supplier.name}</strong> &mdash; {supplier.email} &nbsp;
              <button onClick={() => handleEdit(supplier)} style={{ marginRight: '5px' }}>Edit</button>
              <button onClick={() => handleDelete(supplier.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplierList;
