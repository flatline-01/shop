const database = require('../database');
const CartElem = require('../models/CartElem');

let goodsTableName = 'goods';
const goodsImagesTableName = 'good_images';

module.exports.getGoods = async function(goodsIDs, lang) {
    let selectGoodQuery;
    if(lang === 'en' || lang === undefined){
        selectGoodQuery = `SELECT id, name_en as name, description_en as description, frame_en as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE id = ANY(\$1)`;
    }
    else{ 
        selectGoodQuery = `SELECT id, name_ru as name, description_ru as description, frame_ru as frame, category_id, cost, growth, wheel FROM ${goodsTableName} WHERE id = ANY(\$1)`;
    }

    if (goodsIDs !== undefined && goodsIDs.length !== 0) {
        try {
            let rows = (await database.query(selectGoodQuery, [goodsIDs])).rows;
            for(let i = 0; i < rows.length; i++){
                let images = (await database.query(`SELECT color, image FROM ${goodsImagesTableName} WHERE good_id = $1 `, [rows[i].id])).rows;
                rows[i].images = new Map(images.map(img => [img.color, convertToBase64(img.image)]));
            }
            return rows.map( i => new CartElem(i) );
        } catch (e) {
            console.log(e);
            return [];
        }
    }
    else return [];
}

function convertToBase64(imageBuffer) {
    if (!imageBuffer) {
        return null; 
    }
    return imageBuffer.toString('base64');
}