const { Router } = require ('express');
const loadPages = require ('../controllers/loadPages');
const fileController = require ('../controllers/fileController');
const { verifyToken } = require('../middleware/authMiddleware');
const { registerClient, loginClient, logout, createCustomCollection, insertData, getData } = require('../controllers/clientController');

const router = Router();

// create application/json parser
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Middleware to parse cookies
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// clientController routes
router.post('/register', jsonParser, registerClient);
router.post('/login', jsonParser, loginClient);
router.get('/logout', logout);
router.post('/create-collection', jsonParser, createCustomCollection);
router.post('/insert-data', jsonParser, insertData);
router.post('/get-data', jsonParser, getData);

// Page rendering routes
router.get ("/", loadPages.landingPage);
router.get ("/signup", loadPages.signupPage);
router.get ("/signin", loadPages.loginPage);
router.get("/customfield", loadPages.customfieldspage);
router.get ("/dashboard", verifyToken, loadPages.dashboard);
router.get ("/ai_insights", verifyToken, loadPages.ai_insights);
router.get ("/customer_insights", verifyToken, loadPages.customer_insights);
router.get ("/forecasting", verifyToken, loadPages.forecasting);
router.get ("/esg_metrics", verifyToken, loadPages.esg_metrics);
router.get ("/sentiment_analysis", verifyToken, loadPages.sentiment_analysis);
router.get ("/account_management", verifyToken, loadPages.account_management);
router.get ("/files", verifyToken, loadPages.files);
router.get ("/settings", verifyToken, loadPages.settings);
router.get ("/sales_analytics", verifyToken, loadPages.sales_analytics);

// File management routes
router.post('/upload', jsonParser, fileController.upload.array('files', 10), fileController.uploadFiles);

module.exports = router;