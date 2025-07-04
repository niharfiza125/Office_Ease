import React, { useEffect, useState } from 'react';
import './styles.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleAdd = () => {
    if (!name.trim()) return;
    fetch('http://127.0.0.1:8000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(newCat => {
        setCategories([...categories, newCat]);
        setName('');
      });
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleUpdate = () => {
    if (!editingName.trim()) return;
    fetch(`http://127.0.0.1:8000/api/categories/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    })
      .then(res => res.json())
      .then(updated => {
        setCategories(categories.map(c => (c.id === editingId ? updated : c)));
        setEditingId(null);
        setEditingName('');
      });
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method: 'DELETE',
    })
      .then(() => setCategories(categories.filter(c => c.id !== id)));
  };

  return (
    <div className="form-container">
      <h2>📂 Category List</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add Category</button>
      </div>
      <ul>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map(cat => (
            <li key={cat.id}>
              {editingId === cat.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {cat.name}
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button onClick={() => handleDelete(cat.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CategoryList;
