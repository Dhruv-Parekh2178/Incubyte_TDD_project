import React, { useState } from 'react';

const SweetForm = ({ onAdd }) => {
  const [sweet, setSweet] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSweet((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' || name === 'id' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sweet.id || !sweet.name || !sweet.category || !sweet.price || !sweet.quantity) {
      alert('All fields are required');
      return;
    }
    onAdd(sweet);
    setSweet({ id: '', name: '', category: '', price: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="id" type="number" placeholder="ID" value={sweet.id} onChange={handleChange} className="border p-2 rounded" />
        <input name="name" placeholder="Name" value={sweet.name} onChange={handleChange} className="border p-2 rounded" />
        <input name="category" placeholder="Category" value={sweet.category} onChange={handleChange} className="border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" value={sweet.price} onChange={handleChange} className="border p-2 rounded" />
        <input name="quantity" type="number" placeholder="Quantity" value={sweet.quantity} onChange={handleChange} className="border p-2 rounded" />
      </div>
      <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900">Add Sweet</button>
    </form>
  );
};

export default SweetForm;