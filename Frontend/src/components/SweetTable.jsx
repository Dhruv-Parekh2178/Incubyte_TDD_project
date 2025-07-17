import React, { useState } from 'react';

const SweetTable = ({ sweets, onDelete, onPurchase, onRestock }) => {
  const [qtyMap, setQtyMap] = useState({});

  const handleQtyChange = (id, value) => {
    setQtyMap((prev) => ({ ...prev, [id]: Number(value) }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Buy</th>
            <th className="px-4 py-2">Restock</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sweets.map((sweet) => (
            <tr key={sweet.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{sweet.id}</td>
              <td className="px-4 py-2">{sweet.name}</td>
              <td className="px-4 py-2">{sweet.category}</td>
              <td className="px-4 py-2">₹{sweet.price}</td>
              <td className="px-4 py-2">{sweet.quantity}</td>
              <td className="px-4 py-2">
                <input type="number" className="border w-20 px-2 mr-1" onChange={(e) => handleQtyChange(sweet.id, e.target.value)} />
                <button onClick={() => onPurchase(sweet.id, qtyMap[sweet.id] || 1)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Buy</button>
              </td>
              <td className="px-4 py-2">
                <input type="number" className="border w-20 px-2 mr-1" onChange={(e) => handleQtyChange(sweet.id, e.target.value)} />
                <button onClick={() => onRestock(sweet.id, qtyMap[sweet.id] || 1)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Stock</button>
              </td>
              <td className="px-4 py-2">
                <button onClick={() => onDelete(sweet.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SweetTable;

