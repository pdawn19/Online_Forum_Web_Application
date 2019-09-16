const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) => {
MongoClient.connect(
    'mongodb+srv://PDawn:Supers12@cluster1-jr8md.mongodb.net/test?retryWrites=true'
    )
    .then(client =>{
        console.log("Connected")
        callback(client);
    })
    .catch(err =>{
        console.log("err")
});
};

module.exports = mongoConnect;

//const mysql =  require('mysql2');

//const pool = mysql.createPool({
//  host: 'localhost', 
//   user: 'root',
//   database: 'blog-database',
 //   password: 'YourRootPassword'
//});

//module.exports = pool.promise();



