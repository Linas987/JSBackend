//mysql connection

const mysql = require('mysql');

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "wellfed123",
    database: "forjs"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports=con;
