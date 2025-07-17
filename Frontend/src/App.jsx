import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SweetListPage from './pages/SweetListPage';
import AddSweetPage from './pages/AddSweetPage';

function App() {
  return (
    <Router>
      <div className="p-6 bg-gray-100 min-h-screen">
        <nav className="mb-6 flex gap-4 bg-amber-800 p-3 rounded-lg shadow-inner">
          <Link
            to="/"
            className="text-amber-100 hover:text-amber-50 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1 hover:bg-amber-700"
          >
            <span>🏠</span> Home
          </Link>
          <Link
            to="/add"
            className="text-amber-100 hover:text-amber-50 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1 hover:bg-amber-700"
          >
            <span>➕</span> Add Chocolate
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<SweetListPage />} />
          <Route path="/add" element={<AddSweetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
