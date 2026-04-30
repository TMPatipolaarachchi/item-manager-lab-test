import React, { useEffect, useState } from "react";
import itemApi from "../api/itemApi.js";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const response = await itemApi.get("/");
      setItems(response.data);
    } catch (err) {
      setError("Failed to load items. Check backend server and API URL.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await itemApi.delete(`/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section>
      <div className="header-row">
        <div>
          <h1>Home - Item List</h1>
          <p className="subtitle">All saved items are displayed here.</p>
        </div>
      </div>

      {loading && <p>Loading items...</p>}
      {error && <div className="error">{error}</div>}

      {!loading && items.length === 0 && (
        <div className="card empty-card">No items found. Add a new item first.</div>
      )}

      <div className="grid">
        {items.map((item) => (
          <article className="card item-card" key={item._id}>
            <h3>{item.itemName}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> Rs. {Number(item.price).toFixed(2)}</p>
            
            <button className="delete-btn" onClick={() => deleteItem(item._id)}>Delete</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
