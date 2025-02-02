const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const JWT_SECRET = process.env.JWT_SECRET;
const {
  inventorySchema,
  ordersSchema,
  salesSchema,
  employeesSchema,
  customersSchema,
  productsSchema
} = require('../models/defaults');

// Client registration
exports.registerClient = async (req, res) => {
  try {
    const { firstname, lastname, email, password, companyname } = req.body;

    // Generate a unique database name for the client
    const emailPrefix = email.split('@')[0]; // Extract part before '@'
    console.log(emailPrefix);
    const databaseName = `client_${emailPrefix.replace(/\W/g, "_")}`; // Replace non-word characters

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the client record
    const client = new Client({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      companyname,
      databaseName
    });

    await client.save();

    // Create the client's database and collections
    const db = mongoose.connection.useDb(databaseName);

    // Create models for the predefined collections
    db.model('Inventory', inventorySchema);
    db.model('Orders', ordersSchema);
    db.model('Sales', salesSchema);
    db.model('Employees', employeesSchema);
    db.model('Customers', customersSchema);
    db.model('Products', productsSchema);

    // Generate JWT token
    const token = jwt.sign(
      { clientId: client._id, companyName: client.companyname, companyEmail: client.email, databaseName: client.databaseName },
      JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Set JWT in HttpOnly cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: "Client registered successfully with default collections",
      client: { id: client._id, firstname, lastname, email, companyname, databaseName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Client login
exports.loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the client exists
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { clientId: client._id, companyName: client.companyname, companyEmail: client.email, databaseName: client.databaseName },
      JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Set JWT in HttpOnly cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Prepare user data (excluding password)
    const userData = {
      id: client._id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      companyname: client.companyname,
      databaseName: client.databaseName
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout Client
exports.logout = async (req, res) => {
  // Clear the JWT token cookie by setting its expiration date to the past
  res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true });
  res.redirect('/');
}

// Create a Custom Collection
exports.createCustomCollection = async (req, res) => {
  try {
    const { email, collectionName, schema } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: "Client not found" });

    const db = mongoose.connection.useDb(client.databaseName);
    const collectionSchema = new mongoose.Schema(schema, { strict: false });
    const CustomCollection = db.model(collectionName, collectionSchema);

    res.status(201).json({ message: `Collection ${collectionName} created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert Data into Custom Collection
exports.insertData = async (req, res) => {
  try {
    const { email, collectionName, data } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: "Client not found" });

    const db = mongoose.connection.useDb(client.databaseName);
    const CustomCollection = db.model(collectionName, new mongoose.Schema({}, { strict: false }));

    await CustomCollection.create(data);
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Data from Custom Collection
exports.getData = async (req, res) => {
  try {
    const { email, collectionName } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(404).json({ message: "Client not found" });

    const db = mongoose.connection.useDb(client.databaseName);
    const CustomCollection = db.model(collectionName, new mongoose.Schema({}, { strict: false }));

    const data = await CustomCollection.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};