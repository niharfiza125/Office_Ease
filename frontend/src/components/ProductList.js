import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: '',
    category_id: '',
    supplier_id: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, sku, quantity, price, category_id, supplier_id } = form;
    if (!name || !sku || !quantity || !price || !category_id || !supplier_id) return;

    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/products/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://127.0.0.1:8000/api/products', form);
      }
      fetchProducts();
      setForm({ name: '', sku: '', quantity: '', price: '', category_id: '', supplier_id: '' });
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      price: product.price,
      category_id: product.category_id,
      supplier_id: product.supplier_id
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="form-row">
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="sku" type="text" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="category_id" type="number" placeholder="Category ID" value={form.category_id} onChange={handleChange} />
        <input name="supplier_id" type="number" placeholder="Supplier ID" value={form.supplier_id} onChange={handleChange} />
        <button onClick={handleSubmit}>
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — SKU: {product.sku}, Qty: {product.quantity}, Price: Rs.{product.price}<br/>
            Category ID: {product.category_id}, Supplier ID: {product.supplier_id}<br />
            <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
