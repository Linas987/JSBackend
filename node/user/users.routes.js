module.exports = app => {
    const users = require("./users.controller.js");
    const { forceSync } = require('node-force-sync');

    // Create a new Customer
    app.post("/users", users.create);

    // Retrieve all Customers
    app.get("/users", users.findAll);

    // Retrieve a single Customer with customerId
    app.get("/users/:userId", users.findOne);

    // Update a Customer with customerId
    app.put("/users/:userId", users.update);

    // Delete a Customer with customerId
    app.delete("/users/:userId", users.delete);

    // return hashed password
    app.get("/hash",users.hash);

    // authenticate
    app.post('/auth', users.auth);

};
