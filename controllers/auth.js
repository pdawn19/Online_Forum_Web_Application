exports.getLogin = (req, res, next) => {
      res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
        //editing: false
      });   
  };

  exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.render('/');
    ;   
};