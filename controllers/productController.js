// controllers/productController.js
const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// Create a New Product
const createProduct = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, category, stock, images } = req.body;

  try {
    // Create new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    // Save product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    minPrice,
    maxPrice,
  } = req.query;

  const query = { isDeleted: false };

  if (search) {
    query.name = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get Single Product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Get Product By ID Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete a Product (Soft Delete)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Soft delete by setting isDeleted to true
    product.isDeleted = true;
    await product.save();

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
