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

module.exports.analytics = (req, res) => {
  const { _id, companyName, companyEmail, databaseName } = req.user;

  res.render('analytics', { 
    pageTitle: "Analytics",
    clientCredentials: {
      id: _id,
      companyName,
      companyEmail,
      databaseName
    }
  });
};