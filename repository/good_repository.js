const database = require('../database')
const Good = require("../models/Good");
const goodsTableName = 'goods';
const goodsImagesTableName = 'good_images';
const reviewsTableName = 'reviews';

module.exports.getAllGoods = async (lang) => {
    let selectGoodQuery;
    if(lang === 'en' || lang === undefined){
        selectGoodQuery = `SELECT id, name_en as name, description_en as description, frame_en as frame, category_id, cost, growth, wheel FROM ${goodsTableName}`;
    }
    else{ 
        selectGoodQuery = `SELECT id, name_ru as name, description_ru as description, frame_ru as frame, category_id, cost, growth, wheel FROM ${goodsTableName}`;
    }
    try {
        let rows = (await database.query(selectGoodQuery)).rows;

        for(let i = 0; i < rows.length; i++){
            let images = (await database.query(`SELECT color, image FROM ${goodsImagesTableName} WHERE good_id = $1 `, [rows[i].id])).rows;
            let reviews = (await database.query(selectGoodQuery, rows[i].id)).rows;
            rows[i].images = new Map(images.map(img => [img.color, convertToBase64(img.image)]));
            rows[i].reviews = JSON.parse(JSON.stringify(reviews));
        }

        return !rows ? []
            : rows.map((row) => {  return new Good(row) });

    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}

module.exports.getGoodById = async (goodId, lang) => {
    let selectGoodQuery;
    if(lang === 'en' || lang === undefined){
        selectGoodQuery = `SELECT id, name_en as name, description_en as description, frame_en as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE id = $1`;
    }
    else{ 
        selectGoodQuery = `SELECT id, name_ru as name, description_ru as description, frame_ru as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE id = $1`;
    }

    try {
        let rows = (await database.query(selectGoodQuery, [goodId])).rows;

        if(rows.length > 0){
            let images = (await database.query(`SELECT color, image FROM ${goodsImagesTableName} WHERE good_id = $1 `,[goodId])).rows;
            let reviews = (await database.query(`SELECT * FROM ${reviewsTableName} WHERE good_id = $1`, [goodId])).rows;
            rows[0].images = new Map(images.map(img => [img.color, convertToBase64(img.image)]));
            rows[0].reviews = JSON.parse(JSON.stringify(reviews));
        }

        return (rows && rows.length > 0) ? new Good(rows[0]) : null;

    } catch (e) {
        console.log(`Unable to fetch goods for goodId=${goodId} from database: ${e}`)
        throw new Error('Unable to fetch goods')
    }
}

module.exports.getGoodsByCategory = async (categoryId, lang) => {
    let selectGoodQuery;
    if(lang === 'en' || lang === undefined){
        selectGoodQuery = `SELECT id, name_en as name, description_en as description, frame_en as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE category_id = $1`;
    }
    else{ 
        selectGoodQuery = `SELECT id, name_ru as name, description_ru as description, frame_ru as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE category_id = $1`;
    }

    try {
        let rows = (await database.query(selectGoodQuery, [categoryId])).rows;
        for(let i = 0; i < rows.length; i++){
            let images = (await database.query(`SELECT color, image FROM ${goodsImagesTableName} WHERE good_id = $1 `, [rows[i].id])).rows;
            let reviews = (await database.query(`SELECT * FROM ${reviewsTableName} WHERE good_id = $1 `, [rows[i].id])).rows;
            rows[i].images = new Map(images.map(img => [img.color, convertToBase64(img.image)]));
            rows[i].reviews = JSON.parse(JSON.stringify(reviews));
        }
        return !rows ? [] : rows.map((row) => { return new Good(row) });
    } catch (e) {
        console.log(`Unable to fetch goods for categoryId=${categoryId} from database: ${e}`);
        throw new Error('Unable to fetch goods');
    }
}

module.exports.getProductByName = async (name, lang) => {
    let selectGoodQuery;
    if(lang === 'en' || lang === undefined){
        selectGoodQuery = `SELECT id, name_en as name, description_en as description, frame_en as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE LOWER(name_en) LIKE '%' || \$1 || '%'`;
    }
    else{ 
        selectGoodQuery = `SELECT id, name_ru as name, description_ru as description, frame_ru as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE LOWER(name_ru) LIKE '%' || \$1 || '%'`;
    }

    try {
        let rows = (await database.query(selectGoodQuery, [name])).rows;
        return !rows ? [] : rows.map((row) => { return new Good(row) });
    } catch (e) {
        console.log(`Unable to fetch goods from database: ${e}`);
        throw new Error('Unable to fetch category');
    }
}

function convertToBase64(imageBuffer) {
    if (!imageBuffer) {
        return null;
    }
    return imageBuffer.toString('base64');
}