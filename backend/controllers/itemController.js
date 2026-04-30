import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const itemName = typeof req.body.itemName === "string" ? req.body.itemName.trim() : "";
    const category = typeof req.body.category === "string" ? req.body.category.trim() : "";
    const quantity = req.body.quantity;
    const price = req.body.price;

    if (!itemName) {
      return res.status(400).json({ message: "Item name is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (quantity === undefined || quantity === null || quantity === "") {
      return res.status(400).json({ message: "Quantity is required" });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({ message: "Price is required" });
    }

    const item = await Item.create({
      itemName,
      category,
      quantity: Number(quantity),
      price: Number(price)
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to create item", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { itemName, category, quantity, price } = req.body;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        itemName,
        category,
        quantity: Number(quantity),
        price: Number(price)
      },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};
