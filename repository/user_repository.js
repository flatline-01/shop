const database = require('../database')
const User = require("../models/User");

const usersTableName = 'users';
const usersTableCols = ['first_name', 'last_name', 'email', 'password'];

module.exports.getUserByEmail = async (email) => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${usersTableName} WHERE email = ? `,[email]);
        return (rows && rows.length > 0) ? new User(rows[0]) : null;

    } catch (e) {
        console.log(`Unable to fetch users.${e}`);
        throw new Error('Unable to fetch users');
    }
}

module.exports.createUser = async (data) => {
    try {
        const connection = database.getConnection();
        let row = await connection.query(`SELECT * FROM ${usersTableName} WHERE email = ? `,[data.email]);
        if(row){
            return 'Such a user already exists';
        }
        return await connection.query(`INSERT INTO ${usersTableName} (${usersTableCols}) VALUES (?, ?, ?, ?)`, Object.values(data));

    } catch (e) {
        console.log(`Unable to fetch user. ${e}`);
        throw new Error('Unable to fetch users');
    }
}
