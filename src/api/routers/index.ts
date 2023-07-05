import express 							from "express";
import ProductController 				from "../controllers/product";
import DictionaryController 			from "../controllers/dictionary";

const router = express.Router();

router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/product/:id', ProductController.getProductById);
router.get('/product', ProductController.getProducts);

router.post('/dictionary', DictionaryController.createItem);
router.put('/dictionary/:id', DictionaryController.updateItem);
router.delete('/dictionary/:id', DictionaryController.deleteItem);
router.get('/dictionary/:id', DictionaryController.getItemById);
router.get('/dictionary', DictionaryController.getItems);

export default router;
