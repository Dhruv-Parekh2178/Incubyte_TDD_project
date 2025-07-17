import React from 'react';
import SweetForm from '../components/SweetForm';
import { addSweet, getAllSweets } from '../logic/sweetShop';
import { useNavigate } from 'react-router-dom';

const AddSweetPage = () => {
  const navigate = useNavigate();

  const handleAdd = (sweet) => {
    try {
      addSweet(sweet);
      alert('Chocolate added successfully! 🍫');
      navigate('/');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-amber-100 p-8 rounded-xl shadow-lg border border-amber-200">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-amber-900">
              🍫 Add New Chocolate
            </h1>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-amber-200 shadow-sm">
            <SweetForm onAdd={handleAdd} />
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-amber-700 text-amber-50 rounded-md hover:bg-amber-800 transition-colors duration-200"
          >
            ← Back to Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSweetPage;