const mongoose = require('mongoose');

module.exports.landingPage = (req, res) => {
  res.render('landingpage', {pageTitle: "Landing Page"});
}

module.exports.signupPage = (req, res) => {
  res.render('signup', {pageTitle: "Signup Form"});
}

module.exports.loginPage = (req, res) => {
  res.render('login', {pageTitle: "Signin Form"});
}

module.exports.customfieldspage = (req, res) => {
  res.render('customfields', {pageTitle: "Custom Fields"});
}

module.exports.dashboard = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('dashboard', {
    pageTitle: "Dashboard",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
}

module.exports.ai_insights = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('ai_insights', { 
    pageTitle: "AI Insights",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.customer_insights = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('customer_insights', { 
    pageTitle: "Customer Insights",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.forecasting = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('forecasting', { 
    pageTitle: "Forecasting",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.esg_metrics = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('esg_metrics', { 
    pageTitle: "ESG Metrics",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.sentiment_analysis = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('sentiment_analysis', { 
    pageTitle: "Sentiment Analysis",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.account_management = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('account_management', { 
    pageTitle: "Account Management",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.files = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('files', { 
    pageTitle: "Documents",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

module.exports.collections = async (req, res) => {
  const { databaseName } = req.user;

  try {
    // Connect to the client's database
    const db = mongoose.connection.useDb(databaseName);

    // Fetch all collection names
    const collections = await db.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    // Fetch schema for each collection
    const schemas = {};
    collectionNames.forEach((collectionName) => {
      const model = db.model(collectionName); // Get the model for each collection
      schemas[collectionName] = Object.keys(model.schema.paths); // Extract schema keys
    });

    // Render the collections page with collection names and their schemas
    res.render('collections', {
      pageTitle: 'Collections',
      collections: collectionNames,
      schemas,
      clientCredentials: req.user
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Failed to load collections and schemas' });
  }
};

module.exports.settings = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('settings', { 
    pageTitle: "Settings",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};

const {
  inventorySchema,
  ordersSchema,
  salesSchema,
  employeesSchema,
  customersSchema,
  productsSchema
} = require('../models/defaults');


module.exports.analytics = async (req, res) => {
  const { databaseName } = req.user;

  try {
    const db = mongoose.connection.useDb(databaseName);

    const schemaMap = {
      inventories: inventorySchema,
      orders: ordersSchema,
      sales: salesSchema,
      employees: employeesSchema,
      customers: customersSchema,
      products: productsSchema,
    };

    const collections = await db.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    const schemas = {};
    collectionNames.forEach((collectionName) => {
      const collectionNameLower = collectionName.toLowerCase();
      if (!db.models[collectionName]) {
        if (schemaMap[collectionNameLower]) {
          db.model(collectionName, schemaMap[collectionNameLower]);
        } else {
          console.warn(`No schema found for collection: ${collectionName}`);
          return;
        }
      }
      const model = db.model(collectionName);
      schemas[collectionName] = Object.entries(model.schema.paths)
        .filter(([key]) => key !== '_id' && key !== '__v') // Filter out _id and __v
        .map(([key, value]) => ({
          name: key,
          type: value.instance,
        }));
    });

    res.render('analytics', {
      pageTitle: 'Analytics',
      collections: collectionNames,
      schemas: JSON.stringify(schemas).replace(/</g, '\\u003c'),
      clientCredentials: req.user,
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Failed to load collections and schemas' });
  }
};