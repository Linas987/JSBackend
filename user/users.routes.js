import {create,findAll,findOne,update,remove,hash,auth} from "./users.controller.js";
export default app => {
    
    //const { forceSync } = require('node-force-sync');

    // Create a new Customer
    app.post("/users", create);

    // Retrieve all Customers
    app.get("/users", findAll);

    // Retrieve a single Customer with customerId
    app.get("/users/:userId", findOne);

    // Update a Customer with customerId
    app.put("/users/:userId", update);

    // Delete a Customer with customerId
    app.delete("/users/:userId", remove);

    // return hashed password
    app.get("/hash",hash);

    // authenticate
    app.post('/auth', auth);

};
