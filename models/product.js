
const db = require('../util/database');
const Cart = require('./cart');


module.exports = class Product {
  constructor(blogID, UserID, title, Content, createdTimeStamp) {
    this.blogID = blogID;
    this.title = title;
    this.UserID = UserID;
    this.Content = Content;
    this.createdTimeStamp = createdTimeStamp;
  }

  save() {
    return db.execute('INSERT INTO blogTable ( UserID , title, Content, createdTimeStamp) VALUES (?, ?, ?, ?)',
    [this.UserID, this.title, this.Content, this.createdTimeStamp]);
      }

  static deleteByID(id){
    
  }

  static fetchAll() {
    return db.execute('select * from blogTable');
  }

  static fetchUserPost() {
    return db.execute('select blogID, title, Content, createdTimeStamp from blogtable WHERE UserID = ?', [parseInt("1")]);
  }

  static fetchByID(blogID) {
    return db.execute('select * from blogTable where blogID = ? ', [blogID]);
  }

//Update Posts
  static updatePosts(){
    return db.execute('Update blogtable set TITLE = ?',[this.title]);
  }
  
  //delete Posts
  static deletePosts(blogID){
    return db.execute('Delete from blogtable where blogID = ?', [blogID]);
  }
};
