// models/Product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    trim: true,
    minlength: [3, "Product name must be at least 3 characters long."],
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [0, "Price cannot be negative."],
  },
  category: {
    type: String,
    trim: true,
    default: "",
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative."],
  },
  images: [
    {
      type: String, // URLs to images
      trim: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update 'updatedAt' on document updates
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
