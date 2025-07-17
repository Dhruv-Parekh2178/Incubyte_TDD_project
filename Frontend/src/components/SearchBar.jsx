import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  const [filters, setFilters] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });
  const [sortField, setSortField] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const parsed = {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined
    };
    onSearch(parsed);
  };

  const handleSort = () => {
    onSort(sortField, sortOrder);
  };

  return (
    <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} className="border p-2 rounded" />
        <input name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="border p-2 rounded" />
        <input name="minPrice" type="number" placeholder="Min ₹" value={filters.minPrice} onChange={handleChange} className="border p-2 rounded" />
        <input name="maxPrice" type="number" placeholder="Max ₹" value={filters.maxPrice} onChange={handleChange} className="border p-2 rounded" />
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        <button onClick={handleSearch} className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900">Search</button>
        <div className="flex items-center gap-2">
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border p-2 rounded">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <button onClick={handleSort} className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900">Sort</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;