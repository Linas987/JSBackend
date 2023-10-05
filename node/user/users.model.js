import sql from "../db.js";
import {hash as hashFunc,s as nowDate} from "../utils.js";
// constructor

export class User {
    constructor(user) {
        this.username = user.username;
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = user.password;
        this.date = user.date;
    }
    static create(newUser, result) {
        sql.query(`SELECT * FROM users WHERE username = ?`, [newUser.username], function (e, r) {
            console.log(r.length);
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const isValidEmail = emailRegex.test(newUser.email);
            if (isValidEmail) {
                if (r.length === 0) {
                    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        //console.log(newUser);
                        //return;
                        console.log("created customer: ", { id: res.insertId, ...newUser });
                        result(null, { id: res.insertId, ...newUser });
                    });
                }
                else {
                    console.log("Username_exists");
                    result({ kind: "Username_exists" }, null);
                }
            } else {
                result({ kind: "Invalid email address."}, null);
            }
        });
    }
    static findById(userId, result) {
        sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found user: ", res[0]);
                //this part turns date in a more readable european format based on timezone(yyyy-mm-dd)
                let offset = res[0].date.getTimezoneOffset() * 60 * 1000;
                let mytime = res[0].date.getTime() - offset;
                res[0].date = (new Date(mytime).toISOString().split('T')[0]);
                //
                result(null, res[0]);
                return;
            }

            // not found Customer with the id
            result({ kind: "not_found" }, null);
        });
    }
    static getAll(result) {
        sql.query("SELECT * FROM users", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            //this part turns date in a more readable european format based on timezone(yyyy-mm-dd)
            let i = 0;
            for (i; i < res.length; i++) {
                let offset = res[i].date.getTimezoneOffset() * 60 * 1000;
                let mytime = res[i].date.getTime() - offset;
                res[i].date = (new Date(mytime).toISOString().split('T')[0]);
            }
            //
            console.log("users: ", res);
            //console.log(res[0].date.toISOString().split('T')[0]);
            result(null, res);
        });
    }
    static updateById(id, user, result) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            this.findById(id,(err, oldData) => {
                const isValidEmail = emailRegex.test(user.email?user.email:oldData.email);
            if (isValidEmail && user.password) {
                if (!err) {
                    sql.query(
                        `UPDATE users SET email = ?, name = ?, surname = ?, password = ?, date = ? WHERE id = ?`,
                        [
                            user.email?user.email:oldData.email, 
                            user.name?user.name:oldData.name, 
                            user.surname?user.surname:oldData.surname, 
                            hashFunc(nowDate, user.password), 
                            nowDate, 
                            id],
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }
            
                            if (res.affectedRows == 0) {
                                // not found User with the id
                                result({ kind: "not_found" }, null);
                                return;
                            }
                            
                            console.log("updated user: ", { id: id, ...user });
                            result(null, { id: id, ...user });
                        }
                    );
                }
            } else {
                result({ kind: "Invalid email address. or password missing"}, null);
            }
            }
        )
        
    }
    static remove(id, result) {
        sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted customer with id: ", id);
            result(null, res);
        });
    }
    // retrieve a hashed password
    static hash(date, pass, result) {
        myhash = hashFunc(date, pass);
        console.log("the hashed password is: ", myhash);
        result(null, myhash);
    }
}
