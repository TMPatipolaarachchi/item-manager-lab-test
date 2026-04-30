import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddItem from "./pages/AddItem.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Item Manager</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">Add Item</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
