const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'User',
    password : '7npaS3$9q!4G',
    database : 'react_test_sql'
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