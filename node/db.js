//mysql connection

import { createConnection } from 'mysql';
import fs from 'fs';
const con = createConnection({
    host: 'databaserver.mysql.database.azure.com',
    //username: 'Linas',
    user: 'Linas', // better stored in an app setting such as process.env.DB_USER
    password: 'Lira6447', // better stored in an app setting such as process.env.DB_PASSWORD
    //server: 'databaserver.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 3306, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'database', // better stored in an app setting such as process.env.DB_NAME
    ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
});

con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

export default con;

/*
import sql from 'mssql';

const config = {
    user: 'Linas', // better stored in an app setting such as process.env.DB_USER
    password: 'Lira6447', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'databaserver.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'database', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT TOP 20 *
            FROM [dbo].[Persons]`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

export default sql;
*/