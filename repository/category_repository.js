const database = require('../database');
const Category = require('../models/Category');


module.exports.getCategoryById = async (categoryId, lang) => {
    let categoriesTableName = getActualCategoriesTableName(lang);
    try {
        let category = (await database.query(`SELECT * FROM ${categoriesTableName} WHERE id = $1 `, [categoryId])).rows[0];
        if (category) {
            category["image"] = convertToBase64(category["image"]);
            category["slider_image"] = convertToBase64(category["slider_image"]);
        }
        return category ? new Category(category) : null;
    } catch (e) {
        console.log(`Unable to fetch category ID=${categoryId} from database: ${e}`);
        throw new Error('Unable to fetch category');
    }
}

module.exports.getAllCategories = async (lang) => {
    let categoriesTableName = getActualCategoriesTableName(lang);
    try {
        let rows = (await database.query(`SELECT * FROM ${categoriesTableName}`)).rows;
        if (rows) {
            rows.forEach((row) => {
                row["image"] = convertToBase64(row["image"]);
                row["slider_image"] = convertToBase64(row["slider_image"]);
            });
        }
        return !rows ? [] : rows.map((row) => { return new Category(row) });
    } catch (e) {
        throw new Error('Unable to fetch category: ' + e);
    }
}

module.exports.getCategoryByName = async (name, lang) => {
    let categoriesTableName = getActualCategoriesTableName(lang);
    try {
        let rows = (await database.query(`SELECT * FROM ${categoriesTableName} WHERE LOWER(name) LIKE '%' || \$1 || '%'`, [name])).rows;
        if (rows) {
            rows.forEach((row) => {
                row["image"] = convertToBase64(row["image"]);
                row["slider_image"] = convertToBase64(row["slider_image"]);
            });
        }
        return !rows ? [] : rows.map((row) => { return new Category(row) });

    } catch (e) {
        console.log(e)
        throw new Error('Unable to fetch category');
    }
}

function getActualCategoriesTableName(lang) {
    return (lang === 'en' || lang === undefined) ? 'categories' : 'categories_ru';
}


function convertToBase64(imageBuffer) {
    if (!imageBuffer) {
        return null; 
    }
    return imageBuffer.toString('base64');
}