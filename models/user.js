
const db = require('../util/database');

module.exports = class User {
  constructor(firstName, lastName, email, phoneNumber, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.password = password;
    this.passStr = 'secret';
    this.role = 'user';
  }

  save() {
      console.log(this);
    return db.execute('INSERT INTO usertable ( userName, role, email, phoneNumber, password, firstName, lastName) VALUES (?, ?, ?, ? , ?, ?, ?) ',
    [this.userName, this.role, this.email, this.phoneNumber, this.password,  this.firstName, this.lastName]);
      }

  static deleteByID(id){
    
  }

  static fetchAll() {
    return db.execute('select * from blogTable');
  }

  static fetchByID(id) {
    return db.execute('select * from blogTable where blogID = ? ', [id]);
  }

  
};
