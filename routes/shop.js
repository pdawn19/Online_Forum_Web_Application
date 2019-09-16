const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

// change this to my post
router.get('/post', shopController.getPostUser);
//router.post('/view-post', shopController.postUser);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/checkout', shopController.getCheckout);


//New Routes

router.get('/register', shopController.getRegisterUser);
module.exports = router;

router.post('/post', shopController.postDeletePosts);