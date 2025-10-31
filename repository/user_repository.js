const database = require('../database')
const User = require("../models/User");

const usersTableName = 'users';
const usersTableCols = ['first_name', 'last_name', 'email', 'password', 'phone'];

module.exports.getUserByEmail = async (email) => {
    try {
        let rows = (await database.query(`SELECT * FROM ${usersTableName} WHERE email = $1 `,[email])).rows;
        return (rows && rows.length > 0) ? new User(rows[0]) : null;

    } catch (e) {
        console.log(`Unable to fetch users.${e}`);
        throw new Error('Unable to fetch users');
    }
}

module.exports.createUser = async (data) => {
    try {
        let row = (await database.query(`SELECT * FROM ${usersTableName} WHERE email = $1 `,[data.email])).rows;
        if(row.length > 0){
            return 'Such a user already exists';
        } else {
            return await database.query(`INSERT INTO ${usersTableName} (${usersTableCols}) VALUES ($1, $2, $3, $4, $5)`, Object.values(data));
        }
    } catch (e) {
        console.log(`Unable to fetch user. ${e}`);
        throw new Error('Unable to fetch users');
    }
}
