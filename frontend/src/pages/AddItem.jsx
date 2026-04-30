import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import itemApi from "../api/itemApi.js";

const initialForm = {
  itemName: "",
  category: "",
  quantity: "",
  price: ""
};

function AddItem() {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        itemName: formData.itemName.trim(),
        category: formData.category.trim(),
        quantity: formData.quantity === "" ? "" : Number(formData.quantity),
        price: formData.price === "" ? "" : Number(formData.price)
      };

      await itemApi.post("http://localhost:5000/api/items/", formData);
      setFormData(initialForm);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card form-card">
      <h1>Add Item</h1>
      <p className="subtitle">Enter the item details below.</p>

      {message && <div className="error">{message}</div>}

      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          min="0"
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>
    </section>
  );
}

export default AddItem;
