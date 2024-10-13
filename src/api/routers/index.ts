import express 								from "express";
import * as productController 				from "../controllers/product";
import * as dictionaryController 			from "../controllers/dictionary";

const router = express.Router();

router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);
router.get('/product/:id', productController.getProductById);
router.get('/product', productController.getProducts);

router.post('/dictionary', dictionaryController.createItem);
router.put('/dictionary/:id', dictionaryController.updateItem);
router.delete('/dictionary/:id', dictionaryController.deleteItem);
router.get('/dictionary/:id', dictionaryController.getItemById);
router.get('/dictionary', dictionaryController.getItems);

export default router;
