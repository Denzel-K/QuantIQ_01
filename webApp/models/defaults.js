const mongoose = require('mongoose');

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  product_name: { type: String, required: true },
  stock_level: { type: Number },
  reorder_level: { type: Number },
  last_restock_date: { type: Date }
});

// Orders Schema
const ordersSchema = new mongoose.Schema({
  order_id: { type: Number, required: true },
  customer_id: { type: Number, required: true },
  products: [
    {
      product_id: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total_amount: { type: Number, required: true },
  order_date: { type: Date, default: Date.now }
});

// Sales Schema
const salesSchema = new mongoose.Schema({
  sale_id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  customer_id: { type: Number, required: true },
  quantity_sold: { type: Number },
  sale_datetime: { type: Date, default: Date.now },
  sales_channel: { type: String, enum: ['online', 'in-store'] },
  transaction_amount: { type: Number }
});

// Employees Schema
const employeesSchema = new mongoose.Schema({
  employee_id: { type: Number, required: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  role: { type: String },
  hire_date: { type: Date, default: Date.now }
});

// Customers Schema
const customersSchema = new mongoose.Schema({
  customer_id: { type: Number, required: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  loyalty_program_status: { type: Boolean },
  demographics: { type: Object }
});

// Products Schema
const productsSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  product_name: { type: String, required: true },
  category: { type: String },
  price: { type: Number },
  stock_level: { type: Number },
  reorder_threshold: { type: Number },
  seasonal_indicator: { type: Boolean }
});

module.exports = {
  inventorySchema,
  ordersSchema,
  salesSchema,
  employeesSchema,
  customersSchema,
  productsSchema
};
