const db = require('../db_config/config');
const SQL = require('sql-template-strings');

class User {
    constructor(data){
        this.fname = data.fname
        this.lname = data.lname
        this.email = data.email
        this.pass = data.pass
    }
    
    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT * FROM users;`);
                let users = result.rows.map(r => new User(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err}`)
            }
        })
    }

    static create({ fname, lname, email, pass }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`INSERT INTO users (fname, lname, email, pass)
                                                VALUES (${fname}, ${lname}, ${email}, ${pass}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT * FROM users
                                                WHERE email = ${email};`);
                let user = new User(result.rows[0])
                
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = User