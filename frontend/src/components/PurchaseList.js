import React, { useEffect, useState } from 'react';
import './styles.css';

const PurchaseList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    quantity: '',
    supplier_id: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/purchases')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Sending purchase data:", form); // 👈 ADD THIS LINE

  fetch('http://127.0.0.1:8000/api/purchases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to add purchase');
      }
      return res.json();
    })
    .then((data) => {
      setItems((prev) => [...prev, data]);
      setForm({ product_id: '', quantity: '', supplier_id: '' });
    })
    .catch((err) => {
      console.error('Error:', err);
      alert('Something went wrong. Please check product/supplier IDs.');
    });
};



  const handleEdit = (purchase) => {
    setForm({
      product_id: purchase.product_id,
      quantity: purchase.quantity,
      supplier_id: purchase.supplier_id
    });
    setEditingId(purchase.id);
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/purchases/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      });
  };

  return (
    <div className="form-container">
      <h2>Purchase</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="product_id"
          placeholder="Product ID"
          value={form.product_id}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          name="supplier_id"
          placeholder="Supplier ID"
          value={form.supplier_id}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update Purchase' : 'Add Purchase'}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Product:</strong> {item.product?.name || item.product_id},&nbsp;
            <strong>Supplier:</strong> {item.supplier?.name || item.supplier_id},&nbsp;
            <strong>Quantity:</strong> {item.quantity},&nbsp;
            <strong>Total Cost:</strong> Rs.{item.total_cost}&nbsp;
            <button onClick={() => handleEdit(item)}>Edit</button>&nbsp;
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;
