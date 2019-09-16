const Product = require('../models/product');
const Cart = require('../models/cart');

const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then( ([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true,
      isAuthenticated: req.isLoggedIn
    })  
  }).catch(
    err => {
      console.log(err);
    }
  );

  
};


exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID;
Product.fetchByID(prodID).then( ([rows, fieldData]) => {
  res.render('shop/product-detail', {
    product: rows[0], 
    pageTitle: rows.title,
    path: '/products',
    isAuthenticated: req.isLoggedIn
  });
});
};

exports.getIndex = (req, res, next) => {

  Product.fetchAll().then( ([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Posts',
      path: '/',
      isAuthenticated: req.isLoggedIn
    })
  }).catch(
    err => {
      console.log(err);
    }
  );
  
  
};

exports.getRegisterUser = (req, res, next) => {
  console.log("Haa yahan toh aaya salla");
  res.render('admin/register', {
    pageTitle: 'Register',
    path: '/admin/register',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
    isAuthenticated: req.isLoggedIn
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart( cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', 
      {
       path: '/cart',
       pageTitle: 'Your Cart',
       products: cartProducts,
       isAuthenticated: req.isLoggedIn
      });
    })
  });
  
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productID;
  Product.fetchByID(prodID, (product) => {
    Cart.addProduct(prodID, product.price);
  })
  res.redirect('/products');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  Product.fetchByID(prodID, product => {
    Cart.deleteProduct(prodID, product.price);
    res.redirect('/cart');
    
  });
  
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {path: '/orders', pageTitle: 'My Orders'});
};
/*
exports.getPostUser = (req, res, next) => {
  const UserID = req.params.userID;
  Product.fetchUserPost(UserID).then(([rows, fieldData]) => {
      res.render('/post', {
        prods: products,
        pageTitle: 'My Posts',
        path: '/post',
        hasProducts: products.length > 0,
      });
    });
}
*/

exports.getPostUser = (req, res, next) => {

  Product.fetchUserPost().then( ([rows, fieldData]) => {
    res.render('shop/post', {
      prods: rows,
      pageTitle: ' My Posts',
      path: '/post' ,
    })
  }).catch(
    err => {
      console.log(err);
    }
  );
  
};

exports.postUser = (req, res, next) => {
  const postID = req.body.id;
  const content = req.body.content;
  const time = req.body.createdTimeStamp;
  console.log('Saw posted Posts :(');
  const user = new User(postID, content, time);

  //user.save();
  //res.redirect('/auth/login');
};

//Delete posts
/*exports.postDeletePosts = (req, res, next) => {
  const prodID = req.body.blogID;
  console.log('prodID getting deleted :'+ prodID);
  Product.deletePosts(prodID)
  .then(result => {
    Product.fetchUserPost().then( ([rows, fieldData]) => {
      res.render('shop/post', {
        prods: rows,
        pageTitle: ' My Posts',
        path: '/post' ,
      })
    }).catch(
      err => {
        console.log(err);
      }
    );
    })
  };*/

  exports.postDeletePosts = (req, res, next) => {
    const prodID = req.body.blogID;
    Product.fetchByID(prodID, product => {
    Product.deletePosts(prodID);
      res.redirect('/post');
    }).catch(err => {
      console.log(err);
    })
  };


exports.getCheckout = (req, res, next) =>{
res.render('shop/checkout', {path: '/checkout', pageTitle: 'Checkout Page'})
};