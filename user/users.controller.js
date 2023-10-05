import {User} from "./users.model.js";
import {hash as hashFunc,s as nowDate} from "../utils.js";
import sql from "../db.js";
//import {next} from "lodash";

// Create and Save a new Customer
export const create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const user = new User({
        username: req.body.username,
        surname: req.body.surname,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        date: nowDate
    });
    // hash the password
    user.password=hashFunc(user.date,user.password),
    // Save Customer in the database
    User.create(user, (err, data) => {
        //console.log(data);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
export const findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
export const findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
export const update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
export const remove = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// Retrieve a hashed password.
export const hash = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create data
    const d = ({
        password: req.body.password,
        date: req.body.date
    });
    User.hash(d.date,d.password,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data."
            });
        else res.send(data);
    });
};

export const auth=(request, response)=>{

    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {

        sql.query('SELECT date FROM users WHERE username = ?', [username], function(e, r) {

            if(typeof r[0] !== "undefined") {
                console.log("~rez: "+r);
                let offset = r[0].date.getTimezoneOffset() * 60 * 1000;
                let mytime = r[0].date.getTime() - offset;
                r[0].date = (new Date(mytime).toISOString().split('T')[0]);
                password = (hashFunc(r[0].date, password));
                console.log(password);

                sql.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
                    console.log("Is this correct? :" + password)
                    console.log(results);
                    if (results.length > 0) {
                        request.session.loggedin = true;
                        request.session.username = username;
                        response.redirect('/users/' + results[0].id);
                        // User.findById(results[0].id, (err, data)=> {
                        //
                        //     console.log(data);
                        //     if (err) {
                        //         if (err.kind === "not_found") {
                        //             response.status(404).send({
                        //                 message: `Not found User with id ${results[0].id}.`
                        //             });
                        //         } else {
                        //             response.status(500).send({
                        //                 message: "Error retrieving User with id " + results[0].id
                        //             });
                        //         }
                        //     } else response.send(data);
                        // });
                    } else {
                        response.send('Incorrect Username and/or Password!');

                    }
                    response.end();
                });
            }else {
                response.send('Incorrect Username and/or Password!');
            }
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }

}
