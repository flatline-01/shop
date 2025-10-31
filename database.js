const {Pool} = require('pg');
const util = require('util');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    //insecureAuth : true
})

// module.exports.getConnection = () => {
//     const connection = pg.createConnection(databaseConfiguration);

//     return {
//         query(sql, args) {
//             return util.promisify(connection.query)
//                 .call(connection, sql, args);
//         },
//         close() {
//             return util.promisify(connection.end).call(connection);
//         }
//     };
// }

module.exports = {
  query: (text, params) => pool.query(text, params)
};