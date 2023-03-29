const express = require('express');

const ProductController = require('../controllers/product');

const router = express.Router();

router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/product/:id', ProductController.getProductById);
router.get('/product', ProductController.getProducts);

module.exports = router;
