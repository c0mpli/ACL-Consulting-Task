import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import AdminPanel from './pages/AdminPanel';
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user?<AdminPanel />:<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
