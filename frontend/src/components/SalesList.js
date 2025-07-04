import React, { useEffect, useState } from 'react';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    customer_id: '',
    quantity: ''
  });

  // Fetch sales data on mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sales')
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const product_id = parseInt(form.product_id);
  const customer_id = parseInt(form.customer_id);
  const quantity = parseInt(form.quantity);
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (isNaN(product_id) || isNaN(customer_id) || isNaN(quantity)) {
    alert('Please enter valid numeric values.');
    return;
  }

  fetch('http://127.0.0.1:8000/api/sales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id, customer_id, quantity, date }) // ✅ include date
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to add sale');
      }
      return res.json();
    })
    .then(data => {
      setSales(prev => [...prev, data]);
      setForm({ product_id: '', customer_id: '', quantity: '' });
    })
    .catch(() => {
      alert('Something went wrong. Please check product/customer IDs.');
    });
};


  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/sales/${id}`, {
      method: 'DELETE'
    })
      .then(() => setSales(sales.filter(s => s.id !== id)));
  };

  return (
    <div className="form-container">
      <h2>Sales</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="product_id"
          placeholder="Product ID"
          value={form.product_id}
          onChange={handleChange}
        />
        <input
          name="customer_id"
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button type="submit">Add Sale</button>
      </form>

      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            <strong>Product:</strong> {sale.product?.name || sale.product_id},&nbsp;
            <strong>Customer:</strong> {sale.customer?.name || sale.customer_id},&nbsp;
            <strong>Quantity:</strong> {sale.quantity}
            <button onClick={() => handleDelete(sale.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesList;

