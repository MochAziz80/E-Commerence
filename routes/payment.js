const express = require('express');
const router = express.Router();

const { accessLevelVerifier } = require('../middlewares/verifyToken');
const { PaymentController } = require('../controllers');

// router.get('/payment/:id', accessLevelVerifier, PaymentController.calculateTotal);

module.exports = router;