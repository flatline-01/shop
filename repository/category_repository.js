const database = require('../database');
const Category = require("../models/Category");

const categoriesTableName = 'categories';

module.exports.getCategoryById = async (categoryId) => {
    try {
        const connection = database.getConnection();
        let categories = await connection.query(`SELECT * FROM ${categoriesTableName} where id = ? `,
            [categoryId]);
        return (categories && categories.length > 0) ? new Category(categories[0])
            : null;

    } catch (e) {
        console.log(`Unable to fetch category ID=${categoryId} from database: ${e}`);
        throw new Error('Unable to fetch category');
    }
}
module.exports.getAllCategories = async () => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${categoriesTableName}`);
        return !rows ? []
            : rows.map((row) => { return new Category(row) });

    } catch (e) {
        throw new Error('Unable to fetch category');
    }
}

module.exports.getCategoryByName = async (name) => {
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${categoriesTableName} WHERE name LIKE CONCAT('%', ?,  '%')`, [name]);
        return !rows ? []
            : rows.map((row) => { return new Category(row) });

    } catch (e) {
        console.log(e)
        throw new Error('Unable to fetch category');
    }
}
