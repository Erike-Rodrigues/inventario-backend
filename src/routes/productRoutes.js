const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/produtos', productController.getAllProducts);
router.get('/produtos/:id', productController.getProductById);
router.post('/produtos', productController.createProduct);
router.put('/produtos/:id', productController.updateProduct);
router.delete('/produtos/:id', productController.deleteProduct);
router.get('/produtos', productController.getProductsByCategory);

module.exports = router;
