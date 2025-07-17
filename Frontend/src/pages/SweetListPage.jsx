
import React, { useState } from 'react';
import {
  getAllSweets,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets,
  sortSweets
} from '../logic/sweetShop';
import SweetTable from '../components/SweetTable';
import SearchBar from '../components/SearchBar';

const SweetListPage = () => {
  const [sweets, setSweets] = useState(getAllSweets());

  const handleDelete = (id) => {
    deleteSweet(id);
    setSweets(getAllSweets());
  };

  const handlePurchase = (id, qty) => {
    try {
      purchaseSweet(id, qty);
      setSweets(getAllSweets());
    } catch (e) {
      alert(e.message);
    }
  };

  const handleRestock = (id, qty) => {
    restockSweet(id, qty);
    setSweets(getAllSweets());
  };

  const handleSearch = (filters) => {
    setSweets(searchSweets(filters));
  };

  const handleSort = (field, order) => {
    setSweets(sortSweets(field, order));
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-amber-100 p-6 rounded-xl shadow-lg border border-amber-200">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold text-amber-900">
              🍫 Chocolate Inventory
            </h1>
            <div className="ml-4 px-3 py-1 bg-amber-800 text-amber-50 rounded-full text-sm font-medium">
              {sweets.length} items
            </div>
          </div>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} onSort={handleSort} />
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden border border-amber-200 shadow-sm">
            <SweetTable
              sweets={sweets}
              onDelete={handleDelete}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
            />
          </div>
          
          <div className="mt-6 text-sm text-amber-700 text-center">
            Chocolate inventory last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetListPage;