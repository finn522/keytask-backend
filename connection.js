const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'keytask_user',
    password : 'Hsz4X3TjfE',
    database : 'keytask_database'
    });  

    const app = express();


    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json());  
    app.use(cors());
    app.use(express.json()); 
    app.use(express.urlencoded());

module.exports = {

    // https://github.com/mysqljs/mysql
    connection : connection,
    app: app


}