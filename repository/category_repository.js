const database = require('../database');
const Category = require('../models/Category');

let categoriesTableName; 

module.exports.getCategoryById = async (categoryId, lang) => {
    if(lang === 'en'){
        categoriesTableName = 'categories';
    }
    else {
        categoriesTableName = 'categories_ru';
    }
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
module.exports.getAllCategories = async (lang) => {
    if(lang === 'en'){
        categoriesTableName = 'categories';
    }
    else {
        categoriesTableName = 'categories_ru';
    }
    try {
        const connection = database.getConnection();
        let rows = await connection.query(`SELECT * FROM ${categoriesTableName}`);
        return !rows ? []
            : rows.map((row) => { return new Category(row) });

    } catch (e) {
        throw new Error('Unable to fetch category');
    }
}

module.exports.getCategoryByName = async (name, lang) => {
    if(lang === 'en'){
        categoriesTableName = 'categories';
    }
    else {
        categoriesTableName = 'categories_ru';
    }
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
